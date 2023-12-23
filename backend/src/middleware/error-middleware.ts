import { Request, Response, NextFunction } from "express";

export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    const status = 500;
    const message = error.message || 'Something went wrong on the server.';
    
    console.error('Unhandled error:', error);
    
    res.status(status).send({
        status,
        message,
    });
}