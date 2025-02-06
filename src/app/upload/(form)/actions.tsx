'use server';

import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION || '',
    credentials: {
        accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY || '',
    }
});

const uploadFileToS3 = async (file: Buffer, imageName: string, fileType: string) => {
    const params = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
        Key: `demo/${imageName}`,
        Body: file,
        ContentType: fileType
    };

    console.log("Uploading file:", params);
    const command = new PutObjectCommand(params);

    try {
        await s3Client.send(command);
        const fileUrl = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/images/${imageName}`;
        return fileUrl;
    } catch (error) {
        console.error("S3 Upload Error:", error);
        throw error;
    }
};

const uploadFile = async (prevState: any, formData: any) => {
    try {
        const file = formData.get('file');
        if (!file || file.size === 0) {
            return { status: 'error', message: 'Please select an image' };
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileType = file.type || 'image/jpeg';
        const imageName = formData.get('imageName') || file.name;

        console.log("File Type:", file.type);
        console.log("Image Name:", imageName);

        const fileUrl = await uploadFileToS3(buffer, imageName, fileType);

        revalidatePath('/');
        return { status: 'success', message: 'Image has been uploaded', url: fileUrl };
    } catch (error) {
        console.error("Upload Error:", error);
        return { status: 'error', message: 'Failed to upload image' };
    }
};

export default uploadFile;
