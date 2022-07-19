const Article=require('../models/article')

module.exports.create=function(req,res){
    Article.create({
        title:req.body.title,
        description:req.body.description,
        user:req.user._id
    },function(err,post){
        if(err){console.log('error in creating a post'); return;}
        return res.redirect('back');
    });
}