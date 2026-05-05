output "frontend_bucket_name" {
  description = "The name of the S3 bucket for the frontend"
  value       = aws_s3_bucket.frontend_bucket.bucket
}

output "ecr_repository_url" {
  description = "The URL of the ECR repository"
  value       = aws_ecr_repository.backend_repo.repository_url
}

output "ecs_cluster_name" {
  description = "The name of the ECS cluster"
  value       = aws_ecs_cluster.main_cluster.name
}

output "ecs_service_name" {
  description = "The name of the ECS service"
  value       = aws_ecs_service.backend_service.name
}

output "ecs_task_family" {
  description = "The family of the ECS task definition"
  value       = aws_ecs_task_definition.backend_task.family
}
