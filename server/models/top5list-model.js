const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String},
        items: { type: [String]},
        ownerEmail: { type:String, required: true },
        published: {type: {"published":Boolean,"time":Date}, required:true},
        view: {type: Number, required:true},
        likes: { type: [String], required:true},
        dislikes: {type: [String], required:true},
        comment: {type: [{"comment":String,"author":String}], required:true},
        author: {type:String, required:true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
