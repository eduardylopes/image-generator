import { Request, Response, NextFunction } from 'express';

export const cacheMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader(
    'Cache-Control',
    'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
  );

  next();
};
