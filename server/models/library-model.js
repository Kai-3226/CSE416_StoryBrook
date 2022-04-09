const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LibrarySchema = new Schema(
    {
        ownerId: { type: String, required: true },
        name: { type: String, required: true },
        content: { type: [Object] },
        public: { type: Boolean, required: true }, 
        used: { type: Number, required: true }, 
    },
 
    { timestamps: true },
)

module.exports = mongoose.model('Library', LibrarySchema)
