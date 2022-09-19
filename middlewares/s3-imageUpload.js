import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const {
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
} = process.env;

aws.config.update({
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  accessKeyId: AWS_ACCESS_KEY_ID,
  region: AWS_REGION,
});

const s3 = new S3Client();

const fileFilter = (req, file, cb) => {
  const [, fileType] = file.mimetype.split('/');

  //retrieve extension from the mymetype property and test it against the regexp to allow only certain extensions
  fileType.match(/^(png|jpeg|jpg)$/gi)
    ? cb(null, true)
    : cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
};

const storage = multerS3({
  s3: s3,
  bucket: AWS_BUCKET_NAME,
  acl: 'public-read',
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1];
    const fileName = Date.now().toString();
    cb(null, `${fileName}.${extension}`);
  },
});

const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
});

export default upload;
