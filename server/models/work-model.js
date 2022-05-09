const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkSchema = new Schema(
    {
        name: { type: String, required: true },
        content: { type: Object },  
        // work type is 0:story 1:comic
        workType: { type: Number , required: true },  
        comments: { type: [ {"userId" : String, 
                             "userName": String,
                                "content": String,                                                     
                                "response": Object}],
                             required: true },
        published: { type: {"publish": Boolean,
                                     "date": Date},
                           required: true },
        view: { type: Number, required: true },
        likes: { type: [String], required: true },
        dislikes: { type: [String], required: true },
        author: {type:String, required:true},//author email
        authorName: {type:String, required:true},
        authorId: {type:String, required:true}

    },
    { timestamps: true },
)

module.exports = mongoose.model('Work', WorkSchema)
