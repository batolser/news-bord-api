const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { errMessage } = require('../errors/err-messages');


module.exports.createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.getArticleMiddleware = (req, res, next) => {
  Article.findById({
    _id: req.params.articleId,
  })
    .then((article) => {
      if (!article) {
        throw new NotFoundError(errMessage[404].article);
      }
      return next();
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((articleId) => {
      if (req.user._id !== articleId.owner.toString()) {
        throw new ForbiddenError(errMessage[403]);
      }
      return Article.findByIdAndRemove(req.params.articleId);
    })
    .then((deleted) => {
      res.send({ data: deleted });
    })
    .catch(next);
};
