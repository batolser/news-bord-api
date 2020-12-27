const articleRouter = require('express').Router();
const { celebrate } = require('celebrate');
const validationCookies = require('../middlewares/validationCookies');
const validationCreateArticle = require('../middlewares/validationCreateArticle');
const validationDeleteArticle = require('../middlewares/validationDeleteArticle');
const {
  createArticle, getArticles, getArticleMiddleware, deleteArticle,
} = require('../controllers/article');
const auth = require('../middlewares/auth');


articleRouter.get('/articles', celebrate(validationCookies), auth, getArticles);
articleRouter.post('/articles', celebrate(validationCreateArticle), auth, createArticle);
articleRouter.delete('/articles/:articleId', celebrate(validationCookies), celebrate(validationDeleteArticle), auth, getArticleMiddleware, deleteArticle);

module.exports = articleRouter;
