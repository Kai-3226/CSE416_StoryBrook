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
        notification: { type: [{ "userId": String,
                                 "userName": String, 
                                 "workId": String,
                                 "workType": Number,
                                 "workName": String}]},  
        works: { type: [String]},
        comicLibrary: { type: [String]},
        like: { type: [String]},
        dislike: { type: [String]},
        profile: { type:{"age": Number ,
                        "gender": Number,
                        "userName":String ,
                        "myStatement": String,
                        "icon": String}
                      }
    },
    
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
