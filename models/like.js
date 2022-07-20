const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    //this defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
				// Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
		    // will look at the `onModel` property to find the right model.
        refPath: 'onModel'
    },

    //this field is used for defining the type of the liked object since it is a dynamic reference
    onModel:{
        type: String,
        required: true,
        enum: ['Article'],
    }
}, {
    timestamps: true,
});

const Like = mongoose.model('Like', likesSchema);
module.exports = Like;