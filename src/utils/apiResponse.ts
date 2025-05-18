import { Response } from 'express';

export const successResponse = (
  res: Response,
  data: any,
  statusCode = 200,
  message = 'Success'
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};


export const errorResponse = (
  res: Response,
  message = 'Internal Server Error',
  statusCode = 500,
  error?: any
) => {
  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error : undefined,
  });
};