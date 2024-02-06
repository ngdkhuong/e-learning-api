import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { CloudFrontClient, GetDistributionCommand } from '@aws-sdk/client-cloudfront';
import configKeys from '../../config';
import crypto from 'crypto';

const s3 = new S3Client({
    credentials: {
        accessKeyId: configKeys.AWS_ACCESS_KEY,
        secretAccessKey: configKeys.AWS_SECRET_KEY,
    },
    region: configKeys.AWS_BUCKET_REGION,
});

const cloudFront = new CloudFrontClient({
    credentials: {
        accessKeyId: configKeys.AWS_ACCESS_KEY,
        secretAccessKey: configKeys.AWS_SECRET_KEY,
    },
    region: configKeys.AWS_BUCKET_REGION,
});

const radomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
