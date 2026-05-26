# [DEMO] JAS IaC — intentionally misconfigured AWS resources.
# Frogbot should flag every block below.

provider "aws" {
  region = "us-east-1"
}

# Public S3 bucket without encryption or versioning
resource "aws_s3_bucket" "public_data" {
  bucket = "frogbot-demo-public-data"
  acl    = "public-read"
}

# Security group exposing SSH to the entire internet
resource "aws_security_group" "open_ssh" {
  name = "frogbot-demo-open-ssh"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3389
    to_port     = 3389
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# RDS instance without encryption and with public access
resource "aws_db_instance" "demo" {
  identifier             = "frogbot-demo-db"
  engine                 = "mysql"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  username               = "admin"
  password               = "Password123!"
  publicly_accessible    = true
  storage_encrypted      = false
  skip_final_snapshot    = true
  backup_retention_period = 0
}
