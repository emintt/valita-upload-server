import express, {Request} from 'express';
import { uploadFile } from "../controllers/uploadController";
import multer, { FileFilterCallback } from "multer";
import { authenticate } from '../../middlewares';
import CustomError from '../../classes/CustomError';



/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine Error400
 * @apiError Error400 Error message.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400
 *    {
 *      "error":  "error message",
 *    }
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError Unauthorized.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": 'Unauthorized',
 *     }
 */

/**
 * @api {post} /upload Upload
 * @apiVersion 1.0.0
 * @apiName Uploadfile
 * @apiGroup Upload
 * @apiPermission Bearer Token
 *
 * @apiDescription Upload an image to the server.
 *
 * @apiHeader {String} Authorization Users unique access-token (Bearer Token).
 * @apiBody {FormData} file image file.
 *
 * @apiSuccess {Object} data  Object containing file info.
 * @apiSuccess {String} message  Message containing success message.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Created
 *    {
 *      "message": "file uploaded",
 *      "data": {
 *        "filename": "0119049deba78177824df740f38f8d18",
 *        "media_type": "image/jpeg",
 *        "filesize": 91364
 *      }
 *    }
 *
 * @apiUse Error400
 * @apiUse UnauthorizedError
 */

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  console.log('file at multer', file);
  if (file.mimetype.includes('image')) {
    console.log('image at multer', file);
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
  .post(authenticate, upload.single('file'), uploadFile);

export default fileouter;
