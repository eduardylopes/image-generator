const cacheMiddleware = (_req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
  );

  next();
};

module.exports = { cacheMiddleware };
