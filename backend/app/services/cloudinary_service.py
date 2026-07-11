import cloudinary
import cloudinary.uploader
import cloudinary.api
from fastapi import UploadFile, HTTPException
from app.core.config import settings

def init_cloudinary():
    """Initialize Cloudinary configuration from environment variables."""
    # Priority 1: Use CLOUDINARY_URL if available
    if settings.CLOUDINARY_URL:
        # cloudinary package will automatically read the CLOUDINARY_URL env var if it exists in the system environment,
        # but since we're using python-dotenv with Pydantic, we explicitly set it if using indiv variables
        cloudinary.config(secure=True)
    # Priority 2: Individual variables
    elif settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY and settings.CLOUDINARY_API_SECRET:
        cloudinary.config(
            cloud_name=settings.CLOUDINARY_CLOUD_NAME,
            api_key=settings.CLOUDINARY_API_KEY,
            api_secret=settings.CLOUDINARY_API_SECRET,
            secure=True
        )
    else:
        print("Warning: Cloudinary configuration is missing. Uploads will fail.")

async def upload_file(file: UploadFile, folder: str = "careerbridge", resource_type: str = "auto") -> dict:
    """
    Upload a file directly to Cloudinary from memory (fastapi UploadFile).
    Returns the secure URL and public ID.
    """
    contents = await file.read()
    
    try:
        response = cloudinary.uploader.upload(
            contents,
            folder=folder,
            resource_type=resource_type
        )
        return {
            "secure_url": response.get("secure_url"),
            "public_id": response.get("public_id"),
            "format": response.get("format"),
            "bytes": response.get("bytes")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload to Cloudinary: {str(e)}")

def delete_file(public_id: str, resource_type: str = "image"):
    """
    Delete a file from Cloudinary by its public ID.
    """
    try:
        if public_id:
            cloudinary.uploader.destroy(public_id, resource_type=resource_type)
    except Exception as e:
        print(f"Error deleting from Cloudinary: {e}")
