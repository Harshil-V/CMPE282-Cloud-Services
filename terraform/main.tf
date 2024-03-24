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

resource "aws_s3_bucket" "my_bucket" {
  bucket = "cmpe282-first-bucket"
}

resource "aws_s3_object" "readme_file" {
  bucket = aws_s3_bucket.my_bucket.id
  key    = "README.md"  # The name that will appear in the bucket
  source = "README.md"  # Path to the README file in your project directory
}
