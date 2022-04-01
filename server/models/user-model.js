const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true},
        passwordHash: { type: String, 
                                    required: true },
        email: { type: String, required: true},
        friends: { type: [String], require: true},
        following: { type: [String], require: true},
        follower: { type: [String], require: true},
        message: { type: {"useId":  String,
                                     "unread": Number, 
                                     "content": [{"isYou": Boolean,   
                                                        "message": String}]
                                    },
                           require: true },      
        works: { type: [{"works": String}], 
                     required: true},
        comicLibrary: { type: [{"libraryId": String}], 
                                required: true},
        like: { type: [String], required: true},
        dislike: { type: [String], required: true},
        alarm: { type: [Object], required: true},
        profile: { type:{"age": Number, 
                              "gender": Number,
                              "userName":String ,
                              "myStatement": String,
                              "icon": Object},
                      required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
