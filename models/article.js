const mongoose= require('mongoose');

const articleSchema = new mongoose.Schema({
    //fields of schema
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user:{
        //this type is a refrence to user schema
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],
},{
    //timestamps automatically introduces 
    //created at
    //updated at
    timestamps:true
});

const Article = mongoose.model('Article',articleSchema);
module.exports = Article; 