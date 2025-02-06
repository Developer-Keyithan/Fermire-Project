import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { file } = await req.json();
    console.log(file)

    const region = process.env.NEXT_AWS_S3_REGION;
    const accessKeyId = process.env.NEXT_AWS_S3_ACCESS_KEY_ID;
    const secretAccessKey = process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY;

    if (!region || !accessKeyId || !secretAccessKey) {
        return NextResponse.json({ error: 'Missing AWS S3 configuration' }, { status: 500 });
    }

    const s3Client = new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    const uploadParams = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
        Key: `uploads/${Date.now()}-${file.name}`,
        Body: file.data,
    };

    try {
        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);
        NextResponse.json({ message: 'Image Uploaded' }, { status: 200 })
    } catch (error) {
        NextResponse.json({ message: 'Failed to upload image' }, { status: 500 })
    }
}
