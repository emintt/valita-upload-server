import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction } from "express";
import { TokenContent } from '../../types/uploadTypes';


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
  

  if (!session) return null;
    if (!req.file) {
      res.status(400);
      res.json({error: 'file not valid'});
      return;
    }
    console.log('req file', req.file);
    const response = {
      message: 'file uploaded',
      data: {
        filename: req.file.filename,
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