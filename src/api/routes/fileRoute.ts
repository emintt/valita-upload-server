// import express, {Request} from 'express';


// const fileFilter = (
//   request: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ) => {
//   if (file.mimetype.includes('image') || file.mimetype.includes('video')) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// const upload = multer({dest: './uploads/', fileFilter});
// const router = express.Router();

// // TODO: validation

// router
//   .route('/upload')
//   .post(authenticate, upload.single('file'), makeThumbnail, uploadFile);

// router.route('/delete/:filename').delete(authenticate, deleteFile);

// export default router;
