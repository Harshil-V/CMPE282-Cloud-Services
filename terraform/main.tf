terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  required_version = ">= 0.14"
}

provider "aws" {
  region = "us-west-1"
}

# Assuming this bucket is already defined in your configuration
resource "aws_s3_bucket" "my_bucket" {
  bucket = "cmpe282-first-bucket"
  acl    = "private"
}

# Upload the README file to the S3 bucket
resource "aws_s3_bucket_object" "readme_file" {
  bucket = aws_s3_bucket.my_bucket.bucket
  key    = "README.md"  # The name that will appear in the bucket
  source = "README.md"  # Path to the README file in your project directory
  etag   = filemd5("README.md")
}
