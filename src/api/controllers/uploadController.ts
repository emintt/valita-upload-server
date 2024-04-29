import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction } from "express";
import fs from 'fs';
import CustomError from '../../classes/CustomError';



const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Why JWT_SECRET return undefined?
    const cookies = req.cookies;
    const session = cookies['session'];
    // console.log('session at getSession', session);
    // console.log('SECRECT', process.env.JWT_SECRET);
    // console.log('node env', process.env.NODE_ENV);
    // const decodedToken = jwt.verify(session, process.env.JWT_SECRET as string) as TokenContent;
    // console.log('decoded', decodedToken);
    // if (!decodedToken.user_id) {
    //   res.status(401);
    //   res.json({error: 'Unauthorized'});
    //   return;
    // }

    console.log('req body', req.body);
  
    console.log('req file at controller', req.file);
 
    if (!req.file) {
      const err = new CustomError('file not valid', 400);
      next(err);
      return;
    }
    console.log('req file', req.file);

    // Add filename extension for filename
    const extension =  req.file.originalname.split('.').pop();
    const filename = `${req.file.filename}.${extension}`;

    
    // change file name of req.file.path to filename
    fs.renameSync(req.file.path, `${req.file.destination}/${filename}`);

    const response = {
      message: 'file uploaded',
      data: {
        filename: filename,
        media_type: req.file.mimetype,
        filesize: req.file.size,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.log(error as Error);
    res.status(400).json({message: 'Error uploading file'});
  }
};

export { uploadFile };