#!/usr/bin/env bash
# ==============================================================================
# WORKIFY - AWS EC2 AUTOMATED PROVISIONING SCRIPT
# Target OS: Ubuntu 22.04 / 24.04 LTS
# ==============================================================================

set -e

echo "=== [1/5] Updating System Packages ==="
sudo apt-get update -y
sudo apt-get upgrade -y

echo "=== [2/5] Installing Prerequisites & Docker ==="
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    git \
    htop \
    ufw

# Add Docker official GPG key & repo
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-compose

# Add ubuntu user to docker group
sudo usermod -aG docker ubuntu

echo "=== [3/5] Setting up Firewall (UFW) ==="
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo "=== [4/5] Installing AWS CLI v2 ==="
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt-get install -y unzip
unzip -q awscliv2.zip
sudo ./aws/install
rm -rf aws awscliv2.zip

echo "=== [5/5] Docker Service Status ==="
sudo systemctl enable docker
sudo systemctl start docker

echo "=== Workify EC2 Provisioning Complete! ==="
echo "You can now clone the project repository and run: docker compose up -d"
