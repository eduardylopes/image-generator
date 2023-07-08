import { Request, Response, NextFunction, response } from 'express';
import z from 'zod';

const { DOMAIN_NAME } = process.env;

export const validateURLMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const imageGeneratorSchema = z.object({
    url: z
      .string()
      .url()
      .refine(
        value => {
          const url = new URL(value);
          return url.hostname.includes(DOMAIN_NAME as string);
        },
        {
          message: `The URL must belong to the domain "${
            DOMAIN_NAME as string
          }"`,
        }
      ),
  });

  const result = imageGeneratorSchema.safeParse({
    url: req.query.url,
  });

  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }

  next();
};
