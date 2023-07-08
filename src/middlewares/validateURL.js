const z = require('zod');

const { DOMAIN_NAME } = process.env;

const validateURLMiddleware = (req, res, next) => {
  const imageGeneratorSchema = z.object({
    url: z
      .string()
      .url()
      .refine(
        value => {
          const url = new URL(value);

          if (DOMAIN_NAME) {
            return url.hostname.includes(DOMAIN_NAME);
          }

          return true;
        },
        {
          message: `The URL must belong to the domain "${DOMAIN_NAME}"`,
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

module.exports = { validateURLMiddleware };
