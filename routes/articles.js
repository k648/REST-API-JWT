const express = require('express');
const router  = express.Router();
router.use(express.json());
const Article = require("../model/articles");
const User = require("../model/users");
const controller = require('../controllers/articles');
const admin =require ('../middleware/admin')
const auth = require('../middleware/auth');


router.get('/articles', auth, controller.getAllarticles);
router.post('/articles', controller.postArticles);
router.delete('/articles', controller.deleteArticles);
router.delete('/articles/:_id',[auth,admin], controller.deleteOneArticles);
router.get('/articles/:articleTitle', controller.getOneArticle);
router.put('/articles/:articleTitle', controller.updateArticle);
router.patch('/articles/:articleTitle', controller.updateoneArticle);


module.exports = router;
