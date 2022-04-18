
//app.use(express.json());

const Article = require("../model/articles");

const getAllarticles = async(req,res)=>{
    try{
        const result = await Article.find();
        if(result){
          res.status(200).json(result);
     
        }  else {
          res.send('No article was found');
        }
       
    } catch(err){
      return res.status(400).send(err);
    }
  }



  const postArticles = async(req,res)=>{
    try{        
      const title  = req.body.title;
      const content  = req.body.content;
        const NewArticle  = new Article ({
          title  : req.body.title,
          content: req.body.content 
        });
      const findArticle = await Article.findOne({title:req.body.title})
      if(!(findArticle)){
        const dbArticle = await NewArticle.save();
        res.status(200).send("successfully saved new article") 
      } else  {
        res.send('this article already exist')
      }
      
      } catch(err){
      console.log(err); 
    }
  }


  const deleteArticles = async(req,res)=>{
    try{
      const deletedArticle = await Article.deleteMany()
      if(!deletedArticle){
        res.send('No article found');
      } else {
        res.status(200).send("successfully deleted  articles");
      }
    } catch(err){
      console.log(err); 
    }
  }

  const deleteOneArticles = async(req,res)=>{
    try{
       const deletedArticle = await Article.findByIdAndRemove({_id:req.params._id})
       console.log(deletedArticle)
       res.status(200).send(deletedArticle)
    } catch(err){
      console.log(err); 
    }
  }


  const getOneArticle = async(req,res)=>{
    try{

      const findOneArticle = await Article.findOne({title:req.params.articleTitle})
      if(!(findOneArticle)){
        res.status(401).send('No article matching that title was found'); 
      }
      res.status(200).json(findOneArticle);
    } catch(err){
     res.statusCode(401).send(err);
    }
  }


  const updateArticle = async(req,res)=>{
    try{
      const updateArticle = await Article.update(
        {title:req.params.articleTitle}, 
        {title:req.body.title , content:req.body.content}, 
        {overwrite : true}
        );  
        res.send('Successfully Updated')      
    } catch(err){
     res.status(400).send(err);
    }
  }


  const updateoneArticle = async(req,res)=>{
    try{
      const updateArticle = await Article.update(
        {title:req.params.articleTitle}, 
        {title:req.body}, 
    
        );  
        res.send('Successfully Updated')      
    } catch(err){
     res.status(400).send(err);
    }
  }
 
//export controller functions
module.exports = {
    getAllarticles,
    postArticles,
    deleteArticles,
    deleteOneArticles,
    getOneArticle,
    updateArticle,
    updateoneArticle
};