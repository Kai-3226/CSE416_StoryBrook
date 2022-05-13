const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')
const sendEmail = require("../utils/email/sendEmail");
//const crypto = require("crypto");
const jwt = require("jsonwebtoken")

getLoggedIn = async (req, res) => {
    try {auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        res.status(200).json({
            loggedIn: true,
            user: { 
                _id:loggedInUser._id,
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email,
                friends: loggedInUser.friends,
                following: loggedInUser.following,
                follower: loggedInUser.follower,
                message: loggedInUser.message,      
                works: loggedInUser.works,
                comicLibrary:loggedInUser.comicLibrary,
                like: loggedInUser.like,
                dislike: loggedInUser.dislike,
                alarm: loggedInUser.alarm,
                profile: loggedInUser.profile
            }
        }).send();
    })}catch (err) {
        console.error(err);
        res.status(500).send();
    }


}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                friends: [],
                follwoing: [],
                follower: [],
                message: [],
                works: [],
                comicLibrary: [],
                like: [],
                dislike: [],
                alarm: [],
                profile: {},
                passwordHash: passwordHash
        });

        newUser.friends= [],
        newUser.following= [],
        newUser.follower= [],
        newUser.message= [],      
        newUser.works= [],      
        newUser.comicLibrary=[],
        newUser.like= [],
        newUser.dislike= [],
        newUser.alarm= [],
        newUser.profile= {"age": 0,
                        "gender": "N/A",
                        "userName": newUser.firstName,
                        "myStatement":"Stay Hungry, Stay Foolish",
                        "icon": newUser.firstName.substring(0,1).toUpperCase()+newUser.lastName.substring(0,1).toUpperCase()
                    }
    
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                _id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                friends: savedUser.friends,
                following: savedUser.following,
                follower: savedUser.follower,
                message: savedUser.message,      
                works: savedUser.works,
                comicLibrary:savedUser.comicLibrary,
                like: savedUser.like,
                dislike: savedUser.dislike,
                alarm: savedUser.alarm,
                profile: savedUser.profile
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

loginUser = async (req, res) => {
    try{
        const { email, password} = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false,
                    errorMessage: "Please enter all required fields." })
        }
       
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res
                .status(404)
                .json({
                    success: false,
                    errorMessage: "Enter a valid email or password"
                })
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        console.log(passwordCorrect);
        if (!passwordCorrect){
            return res
                .status(404)
                .json({
                    success: false,
                    errorMessage: "Enter a valid email or password."
                })
        }
        
        console.log(existingUser);
        // LOGIN THE USER
        const token = auth.signToken(existingUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                _id:   existingUser._id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                friends:  existingUser.friends,
                following: existingUser.following,
                follower:  existingUser.follower,
                message:  existingUser.message,      
                works:  existingUser.works,
                comicLibrary: existingUser.comicLibrary,
                like:  existingUser.like,
                dislike:  existingUser.dislike,
                alarm: existingUser.alarm,
                profile:  existingUser.profile
            }
        }).send();
    } catch (err) {
        res.status(500).json({
            success: false,
            errorMessage:"Log in process is wrong"
        }).send();
    }
}

logoutUser= async (req, res) => {
    await res.clearCookie()
    .status(200).json({
        success:true,
        user:null
    }).send();
}


getUserData = async(req,res) =>{
    console.log(req.params.id);
    await User.findOne({ id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        console.log(JSON.stringify(user));
        return res.status(200).json({ success: true, user: user })
    }).catch(err => console.log(err))
}
//get a userdata by email
getOneUser = async(req,res) =>{
    // console.log(email);
    await User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        res.status(200).json({ success: true, user: user }).send();
    }).catch(
        error => {
            console.log("FAILURE: " + JSON.stringify(error));
            return res.status(404).json({
                success: false,
                err: 'not found the user!'
            })
        }
        )
}
getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users not found` })
        }
        console.log(users);
        res.status(200).json({ success: true, users: users }).send()
    }).catch(err => console.log(err))
}
updateUser =async (req,res) => {
    const body = req.body
    // console.log("updateUser: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: body._id }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        console.log(body);
        if (err) {
            return res.status(404).json({
                success: false,
                errMessage: 'User not found!'
            })
        }

        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.friends = body.friends;
        user.following = body.following;
        user.follower = body.follower;
        user.message = body.message;
        user.works = body.works;
        user.comicLibrary = body.comicLibrary;
        user.like = body.like;
        user.dislike=body.dislike;
        user.notification=body.notification;
        user.profile=body.profile;
        
        user.save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    user:user,
                    message: 'User data updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    success: false,
                    message: 'User data not updated!'
                })
            })
    })
}

sendUserEmail = async (req, res) => {
    try {
        const useremail = req.body.email;
        const existingUser=await User.findOne({ email: useremail });
       
        if (!existingUser) {          
           console.log("An account with this email address does not exist.") ;
           return res
                .status(404)
                .json({
                    success: false,
                    errorMessage: "An account with this email address does not exist."
                })
        }
      
        const token = auth.signToken(existingUser);
        if(!token){
            console.log("cant create token");
            return res
            .status(400)
            .json({
                success: false,
                errorMessage: "cant create token"
            })
        }

        clientURL="sbrook.herokuapp.com";
        const link = `${clientURL}/passwordReset/${token}/${existingUser._id}/`;
        await sendEmail(existingUser.email,"Password Reset Request",{name: existingUser.name,link: link,},"./template/requestResetPassword.handlebars");
      
        return res
        .status(200)
        .json({
            success: true,
            message: 'the reset email sent sucessfully!'
        })
      
        
    } catch (error) {
        console.log(error, "email not sent");
        return res
        .status(400)
        .json({
            success: false,
            errorMessage: "email can't be send"
        })
        
    }
}

resetPassword = async (req, res) => {
    try {
        const newPass= req.body.newPass;
        const {token,id}=req.params;
            
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(verified.userId==id) {console.log("find the account need to be reset;")}
        
        const existingUser = await User.findOne({ _id: id });
        if (!existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "You account is not exists!!!"
                })
        }        
        if (newPass.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        
   

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(newPass, salt);       
        existingUser.passwordHash=passwordHash;     
        const savedUser = await existingUser.save();
        
        return res
        .status(200)
        .json({
            success: true,
            message: 'the password reset successful!',
        })
       
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success:false,
            errorMessage:"Can't reset the password",
            }).send();
    }
}

changePassword = async (req, res) => {
    try {
        const { email, password} = req.body;
       console.log(password);
        console.log(email);
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        
        const existingUser = await User.findOne({email: email});
        console.log(existingUser)
        existingUser.passwordHash=passwordHash;  
        const savedUser = await existingUser.save();

        return res
            .status(200)
            .json({
                success: true,
                user: savedUser,
                message: 'the password reset successful!',
            })

    } catch (error) {
        console.log(error, "error to reset");
    }
}
verifyEmail = async (req, res) => {
    try {
        const {code,useremail} = req.body;
       
      
        await sendEmail(existingUser.email,"Verification Email Code",{name: "",link: code,},"./template/welcome.handlebars");
      
        return res
        .status(200)
        .json({
            success: true,
            message: 'the reset email sent sucessfully!'
        })
      
        
    } catch (error) {
        console.log(error, "email not sent");
        return res
        .status(400)
        .json({
            success: false,
            errorMessage: "email can't be send"
        })
        
    }
}


module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    getUserData,
    updateUser,
    sendUserEmail,
    resetPassword,
    changePassword,
    verifyEmail,
    getOneUser,
    getUsers
}