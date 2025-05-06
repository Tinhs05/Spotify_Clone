from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from django.conf import settings
import boto3
import uuid
import mimetypes

class UploadToS3View(APIView):
    # Lớp phân tích cú pháp cho phép tải lên nhiều phần
    parser_classes = [MultiPartParser]

    def get_file_type(self, file_obj):
        # Xác định loại file dựa trên MIME type
        content_type = file_obj.content_type
        if content_type.startswith('image/'):
            return 'image'
        elif content_type.startswith('audio/'):
            return 'audio'
        elif content_type.startswith('video/'):
            return 'video'
        return 'other'

    def post(self, request):
        # Lấy file từ request
        file_obj = request.FILES['file']
        # Lấy loại đối tượng (track, playlist, user) từ request
        object_type = request.data.get('object_type', 'other')
        # Lấy phần mở rộng của file
        ext = file_obj.name.split('.')[-1]
        # Xác định loại file
        file_type = self.get_file_type(file_obj)
        # Tạo tên file duy nhất với UUID
        unique_filename = f"{uuid.uuid4()}.{ext}"
        # Tạo đường dẫn đầy đủ trong S3
        s3_path = f"{object_type}/{file_type}/{unique_filename}"
        
        # Khởi tạo client S3 với thông tin xác thực
        s3 = boto3.client(
            's3',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME
        )
        
        try:
            # Tải file lên S3 với đường dẫn đã tổ chức
            s3.upload_fileobj(
                file_obj, 
                settings.AWS_STORAGE_BUCKET_NAME, 
                s3_path,
                ExtraArgs={
                    'ContentType': file_obj.content_type
                }
            )
            
            # Tạo pre-signed URL cho file (có hiệu lực trong 1 năm)
            url = s3.generate_presigned_url(
                'get_object',
                Params={
                    'Bucket': settings.AWS_STORAGE_BUCKET_NAME,
                    'Key': s3_path
                },
                ExpiresIn=31536000  # 1 năm tính bằng giây
            )
            
            # Trả về URL trong response
            return Response({'url': url})
        except Exception as e:
            return Response({'error': str(e)}, status=500)
