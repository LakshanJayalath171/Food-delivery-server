import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
    constructor(private readonly configService: ConfigService) {
        cloudinary.config({
            cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
            secure:true
        });
    }

    async uploadImage(file: Express.Multer.File){
        try{
            const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`);
            return{
                success:true,
                message:'Image uploaded successfully',
                imageUrl:result.secure_url,
                imageId:result.public_id
            }
        }
        catch (error) {
            throw new InternalServerErrorException('Failed to upload image to Cloudinary');
        }
    }

    async deleteImage(imageId: string){
        try{
            const result = await cloudinary.uploader.destroy(imageId);

            if(result.result !== 'ok'){
                throw new InternalServerErrorException('Failed to delete image from Cloudinary');
            }

            return{
                success:true,
                message:'Image deleted successfully'
            }
        }
        catch (error) {
            throw new InternalServerErrorException('Failed to delete image from Cloudinary');
        }
    }
}
