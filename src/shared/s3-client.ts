import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectAclCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { MemoryStorageFile } from '@blazity/nest-file-fastify'
import { NotFoundException } from '@nestjs/common'

const { AWS_S3_BUCKET, NODE_ENV, AWS_S3_ENDPOINT } = process.env

const isDev = NODE_ENV === 'development'

let s3Client: S3Client | null

export const domain = isDev
  ? `${AWS_S3_ENDPOINT}/${AWS_S3_BUCKET}`
  : `${AWS_S3_BUCKET}.s3.amazonaws.com`

const bucketName = AWS_S3_BUCKET

export const getS3Client = () => {
  if (!s3Client) {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
    const region = process.env.AWS_REGION
    const endpoint = process.env.AWS_S3_ENDPOINT

    s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
      apiVersion: 'v4',
      endpoint,
    })
  }

  return s3Client
}

export const getDownloadUrl = async (key: string, expiresIn = 3600) => {
  const s3Client = getS3Client()

  try {
    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
        ResponseContentType: 'application/octet-stream',
      }),
      { expiresIn },
    )

    return url
  } catch (error) {
    throw new NotFoundException('Existing files not found on S3')
  }
}

export const putObject = async (key: string, file: MemoryStorageFile) => {
  const s3Client = getS3Client()

  const uploadParams: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ACL: 'private',
    ContentType: file.mimetype,
  }

  const command = new PutObjectCommand(uploadParams)

  return s3Client.send(command)
}

export const getObject = async (key: string) => {
  const s3Client = getS3Client()

  const params: GetObjectCommandInput = {
    Bucket: bucketName,
    Key: key,
  }

  const command = new GetObjectCommand(params)

  return s3Client.send(command)
}

export const deleteObject = async (key: string) => {
  const s3Client = getS3Client()

  const deleteParam: DeleteObjectCommandInput = {
    Bucket: bucketName,
    Key: key,
  }

  const command = new DeleteObjectCommand(deleteParam)

  return s3Client.send(command)
}

export const updateAccessPermissionsOnS3 = async (
  key: string,
  acl: 'private' | 'public-read' | 'public-read-write' = 'public-read',
) => {
  const s3Client = getS3Client()

  try {
    const aclParams = {
      Bucket: bucketName,
      Key: key,
      ACL: acl,
    }

    const command = new PutObjectAclCommand(aclParams)
    await s3Client.send(command)

    return true
  } catch {
    return false
  }
}
