const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});

async function uploadFiles(files) {
  const fileUploads = files.map(async (file, index) => {
    const fileName = `user-photos/${file.originalname}-${Date.now()}`; 
    const fileUrl = await s3
      .upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    return {
      fileUrl: fileUrl.Location, 
      fileName: fileName, 
    };
  });

  return await Promise.all(fileUploads);
}


async function uploadQrCodeToS3(qrCodeBase64, page_uuid) {
  const buffer = Buffer.from(
    qrCodeBase64.replace(/^data:image\/png;base64,/, ""),
    "base64"
  );
  const fileName = `qrcodes/${page_uuid}.png`;

  const uploadResult = await s3
    .upload({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: fileName,
      Body: buffer,
      ContentType: "image/png",
    })
    .promise();

  return uploadResult.Location; // Retorna a URL pública
}

module.exports = { uploadFiles, uploadQrCodeToS3 };
