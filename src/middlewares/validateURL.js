const z = require('zod');

const { DOMAIN_NAME } = process.env;

const validateURLMiddleware = (req, res, next) => {
  const imageGeneratorSchema = z.object({
    url: z.string().url('Invalid URL'),
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
