const Like = require('../models/like');

const Article = require('../models/article');

module.exports.toggleLike = async function(req, res){
    try{
        //likes/toggle/?id=abcded&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Article'){
            likeable = await Article.findById(req.query.id).populate('likes');
        }else{
            return res.error("No such Likeable Type is present");
        }

        if(likeable.user == req.user.id){
            return res.send("You can't like your own Article");
        }

        //Check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id,
        });

        //If a like already exists then delete it
        if(existingLike){
            //If like already exists in the Post or Comments , then delete it from there
            likeable.likes.pull(existingLike._id);
            likeable.save();

            //Delete the record of likes from Likes Collection
            existingLike.remove();
            deleted = true;
        }else{
            //Make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            //Push the created like into the Post likes or comments Likes array
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        // return res.status(200).json({
        //     message: "Request Successful", 
        //     data: {
        //         deleted: deleted,
        //     }
        // })

        return res.redirect("back");


    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err,
        });
    }
}