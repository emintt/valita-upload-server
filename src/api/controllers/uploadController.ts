import {Request, Response, NextFunction } from "express";


const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('res file', req.file);
   console.log('req.body', req.body);
  } catch (error) {
    console.log(error as Error);
    res.status(400).json({message: 'Error uploading file'});
  }
};

export { uploadFile };