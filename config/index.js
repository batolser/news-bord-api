module.exports = {
  PORT: parseInt(process.env.PORT, 10) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
  DB: process.env.DB || 'mongodb://localhost:27017/news-bord_db',
};
