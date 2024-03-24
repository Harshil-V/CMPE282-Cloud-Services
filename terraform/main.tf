terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.0"
    }
  }
}

provider "aws" {
  region = "us-west-1"
}

# Reference an existing S3 bucket
data "aws_s3_bucket" "existing" {
  bucket = "cmpe282-first-bucket"
}

# Example usage: Upload a file to the existing bucket
resource "aws_s3_object" "readme_file" {
  bucket = data.aws_s3_bucket.existing.bucket
  key    = "README.md"
  source = "../README.md"
}