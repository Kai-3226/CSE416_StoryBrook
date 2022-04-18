const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema(
    { 
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String},
        friends: { type: [String]},
        following: { type: [String]},
        follower: { type: [String]},
        message: { type: [{ "useId":  String,
                            "unread": Number, 
                            "content": [{"isYou": Boolean,   
                                    "message": String}]
                                    }]},      
        works: { type: [{"workId": String}]},
        comicLibrary: { type: [{"libraryId": String}]},
        like: { type: [String]},
        dislike: { type: [String]},
        alarm: { type: [Object]},
        profile: { type:{"age": Number ,
                        "gender": Number,
                        "userName":String ,
                        "myStatement": String,
                        "icon": Object}
                      }
    },
    
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
