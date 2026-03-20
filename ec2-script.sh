#!/bin/bash

# ===== CONFIG =====
INSTANCE_ID="${INSTANCE_ID:-your-instance-id}"  # fallback to env var

# ===== INPUT =====
ACTION=$1

if [ -z "$ACTION" ]; then
  echo "[ERROR] Usage: $0 {start|stop|status}"
  exit 1
fi

# ===== CHECK AWS CLI =====
if ! command -v aws &> /dev/null; then
  echo "[ERROR] AWS CLI not installed."
  exit 1
fi

# ===== SCOUT =====
CURRENT_STATE=$(aws ec2 describe-instances \
  --instance-ids "$INSTANCE_ID" \
  --query "Reservations[0].Instances[0].State.Name" \
  --output text 2>&1)

if [ $? -ne 0 ]; then
  echo "[ERROR] Could not reach EC2. Check credentials or instance ID."
  echo "$CURRENT_STATE"
  exit 1
fi

echo "[INFO] Instance ID:     $INSTANCE_ID"
echo "[INFO] Current State:   $CURRENT_STATE"

# ===== ACTIONS =====
if [ "$ACTION" == "start" ]; then
  if [ "$CURRENT_STATE" == "running" ]; then
    echo "[SKIP] Instance is already running. No action taken."
  else
    echo "[ACTION] Starting instance..."
    aws ec2 start-instances --instance-ids "$INSTANCE_ID"

    echo "[WAIT] Waiting for instance to reach 'running' state..."
    aws ec2 wait instance-running --instance-ids "$INSTANCE_ID"

    PUBLIC_IP=$(aws ec2 describe-instances \
      --instance-ids "$INSTANCE_ID" \
      --query "Reservations[0].Instances[0].PublicIpAddress" \
      --output text)

    echo "[DONE] Instance is running."
    echo "[INFO] Public IP: $PUBLIC_IP"
  fi

elif [ "$ACTION" == "stop" ]; then
  if [ "$CURRENT_STATE" == "stopped" ]; then
    echo "[SKIP] Instance is already stopped. No action taken."
  else
    echo "[ACTION] Stopping instance..."
    aws ec2 stop-instances --instance-ids "$INSTANCE_ID"

    echo "[WAIT] Waiting for instance to reach 'stopped' state..."
    aws ec2 wait instance-stopped --instance-ids "$INSTANCE_ID"

    echo "[DONE] Instance is stopped."
  fi

elif [ "$ACTION" == "status" ]; then
  PUBLIC_IP=$(aws ec2 describe-instances \
    --instance-ids "$INSTANCE_ID" \
    --query "Reservations[0].Instances[0].PublicIpAddress" \
    --output text)
  echo "[INFO] Public IP: $PUBLIC_IP"

else
  echo "[ERROR] Invalid action: '$ACTION'. Use start | stop | status"
  exit 1
fi