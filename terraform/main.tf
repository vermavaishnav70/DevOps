terraform {
  backend "s3" {}
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

data "aws_caller_identity" "current" {}

resource "random_id" "suffix" {
  byte_length = 4
}

# ==============================================================================
# S3 (Frontend)
# ==============================================================================

resource "aws_s3_bucket" "frontend_bucket" {
  bucket        = "${var.project_name}-frontend-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_versioning" "frontend_versioning" {
  bucket = aws_s3_bucket.frontend_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "frontend_encryption" {
  bucket = aws_s3_bucket.frontend_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Rubric Requirement: Public access blocked
resource "aws_s3_bucket_public_access_block" "frontend_public_access_block" {
  bucket                  = aws_s3_bucket.frontend_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# (CloudFront removed due to voclabs permissions)

# ==============================================================================
# ECR (Backend)
# ==============================================================================

resource "aws_ecr_repository" "backend_repo" {
  name                 = "${var.project_name}-backend-${random_id.suffix.hex}"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

# ==============================================================================
# ECS (Backend)
# ==============================================================================

resource "aws_ecs_cluster" "main_cluster" {
  name = "${var.project_name}-cluster-${random_id.suffix.hex}"
}

data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_security_group" "ecs_tasks_sg" {
  name        = "${var.project_name}-ecs-tasks-sg-${random_id.suffix.hex}"
  description = "Allow inbound access to ECS tasks"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    protocol    = "tcp"
    from_port   = 5001
    to_port     = 5001
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Use the pre-existing LabRole provided by AWS Academy/voclabs instead of creating a new role.
locals {
  lab_role_arn = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/LabRole"
}

resource "aws_cloudwatch_log_group" "ecs_logs" {
  name              = "/ecs/${var.project_name}-backend-${random_id.suffix.hex}"
  retention_in_days = 7
}

resource "aws_ecs_task_definition" "backend_task" {
  family                   = "${var.project_name}-backend-task-${random_id.suffix.hex}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  
  # Using AWS Academy LabRole
  execution_role_arn       = local.lab_role_arn
  task_role_arn            = local.lab_role_arn

  container_definitions = jsonencode([
    {
      name      = "backend-container"
      image     = "${aws_ecr_repository.backend_repo.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = 5001
          hostPort      = 5001
          protocol      = "tcp"
        }
      ]
      environment = [
        {
          name  = "MONGO_URI"
          value = var.mongo_uri
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs_logs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "backend_service" {
  name            = "${var.project_name}-backend-service"
  cluster         = aws_ecs_cluster.main_cluster.id
  task_definition = aws_ecs_task_definition.backend_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_tasks_sg.id]
    assign_public_ip = true
  }

  lifecycle {
    ignore_changes = [task_definition]
  }
}
