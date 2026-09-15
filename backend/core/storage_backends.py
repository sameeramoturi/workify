import os
from storages.backends.s3boto3 import S3Boto3Storage

class PublicMediaStorage(S3Boto3Storage):
    """
    Storage backend for publicly accessible media files:
    - Worker profile pictures
    - Customer avatars
    - Work gallery portfolio images
    """
    location = 'media/public'
    default_acl = 'public-read'
    file_overwrite = False

class PrivateMediaStorage(S3Boto3Storage):
    """
    Storage backend for sensitive documents requiring authorization & time-limited signed URLs:
    - Worker KYC proofs (Aadhaar, Driving License, Trade Certificates)
    - Invoice receipts
    """
    location = 'media/private/kyc'
    default_acl = 'private'
    file_overwrite = False
    custom_domain = False
    querystring_auth = True
    querystring_expire = 900  # Signed URL valid for 15 minutes
