import boto3
import os
from botocore.exceptions import ClientError

def get_s3_client():
    return boto3.client(
        's3',
        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
        region_name=os.environ.get('AWS_S3_REGION_NAME', 'ap-south-1')
    )

def create_presigned_upload_url(file_name: str, file_type: str, folder: str = "media/public", expiration: int = 300) -> dict:
    """
    Generate a pre-signed S3 URL to upload a file directly from the client.
    """
    bucket_name = os.environ.get('AWS_STORAGE_BUCKET_NAME', 'workify-media-storage')
    object_key = f"{folder}/{file_name}"
    s3_client = get_s3_client()

    try:
        response = s3_client.generate_presigned_post(
            Bucket=bucket_name,
            Key=object_key,
            Fields={"Content-Type": file_type},
            Conditions=[
                {"Content-Type": file_type},
                ["content-length-range", 10, 10485760]  # Min 10B, Max 10MB
            ],
            ExpiresIn=expiration
        )
        return {
            "upload_url": response['url'],
            "fields": response['fields'],
            "file_url": f"https://{bucket_name}.s3.amazonaws.com/{object_key}"
        }
    except ClientError as e:
        return {"error": str(e)}

def create_presigned_download_url(object_key: str, expiration: int = 900) -> str:
    """
    Generate a temporary signed URL for authorized users (e.g. Admin viewing worker KYC documents).
    """
    bucket_name = os.environ.get('AWS_STORAGE_BUCKET_NAME', 'workify-media-storage')
    s3_client = get_s3_client()

    try:
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': object_key},
            ExpiresIn=expiration
        )
        return url
    except ClientError as e:
        return ""
