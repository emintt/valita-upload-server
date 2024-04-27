import express, {Request} from 'express';
import { uploadFile } from "../controllers/uploadController";
import multer, { FileFilterCallback } from "multer";

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.includes('image')) {
    console.log('file at multer', file);
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const upload = multer({
  dest: './uploads/', 
  limits:  {
    fileSize: 10 * 1024 * 1024, // max 10 MB
  }, 
  fileFilter}
);

const fileouter = express.Router();

fileouter
  .route('/upload')
  .post(upload.single('file'), uploadFile);

export default fileouter;
