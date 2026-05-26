# [DEMO] JAS Secrets — hard-coded AWS credentials (FAKE values)
# Frogbot should flag the AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY pair.
# Use IAM roles or environment-injected secrets instead.

import boto3

AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
AWS_REGION = "us-east-1"


def upload(bucket: str, key: str, body: bytes) -> None:
    client = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name=AWS_REGION,
    )
    client.put_object(Bucket=bucket, Key=key, Body=body)
