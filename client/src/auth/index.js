import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGOUT_USER: "LOGOUT_USER",
    LOGIN_USER: "LOGIN_USER",
    ERROR: "ERROR",
    UPDATE_USER: "UPDATE_USER",
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: false,
        userList:[]
    });
    const history = useHistory();

    // useEffect(() => {
    //     auth.getLoggedIn();
    // }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: false
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user:null,
                    loggedIn: false,
                    error: false
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user:payload,
                    loggedIn:true,
                    error:false
                })
            }
            case AuthActionType.ERROR: {
                return setAuth({
                    user:null,
                    loggedIn:false,
                    error:payload
                })
            }case AuthActionType.UPDATE_USER: {
                return setAuth({
                    user:payload,
                    loggedIn:true,
                    error:false
                })
            }
            
            default:
                return setAuth({
                    user:null,
                    loggedIn:false,
                    error:false
                })
        }
    }
    auth.default= function () {
        authReducer({
            type: AuthActionType.default,
            payload: null
        });
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user,
                }
            });
        }
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        }
        catch(err){
            authReducer({
                type: AuthActionType.ERROR,
                payload:{
                    status:err.response.status,
                    message:err.response.data.errorMessage
                }
            })
        }
    }
    auth.logoutUser = async function(){
        const response = await api.logoutUser();
        if(response.status === 200){
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                paylaod:null
            })
            history.push("/");
        }
    }
    auth.loginUser = async function(user){
        try{
            const response = await api.loginUser(user);
            if(response.status===200){
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload:response.data.user
                })
                history.push("/");
               
            }
        }
        catch(err){
            authReducer({
                type: AuthActionType.ERROR,
                payload:{
                    status:err.response.status,
                    message:err.response.errorMessage
                }
            })
            console.log(err);
        }
        
    }
    auth.forgetPassword= async function(email){
        try{
            const response = await api.sendUserEmail({"email":email});
            if(response.status===200){
                // authReducer({
                //     type: AuthActionType.LOGIN_USER,
                //     payload:response.data.user
                // })
            alert("A reset link is sent to your email box.");
            }
            
        }
        catch(err){
            // authReducer({
            //     type: AuthActionType.ERROR,
            //     payload:{
            //         status:err.response.status,
            //         message:err.response.data.errorMessage
            //     }
            // })
            console.log(err);
        }
    }
    auth.resetPassword= async function(token,id,newPass){
        try{
            
            const response = await api.resetPassword(token,id,{"newPass":newPass});
           if(response.status===200){
                history.push('/login')
            }
           
        }
        catch(err){
            // authReducer({
            //     type: AuthActionType.ERROR,
            //     payload:{
            //         status:err.response.status,
            //         message:err.response.data.errorMessage
            //     }
            // })
            console.log("error of reset password");
        }
    }

    auth.verifyEmail= async function(code,email){
        try{
            const response = await api.verifyEmail({"code":code,"email":email});
            if(response.status===200){
                // authReducer({
                //     type: AuthActionType.LOGIN_USER,
                //     payload:response.data.user
                // })
            alert("A verification email is sent to your email box.");
            }
            
        }
        catch(err){
            // authReducer({
            //     type: AuthActionType.ERROR,
            //     payload:{
            //         status:err.response.status,
            //         message:err.response.data.errorMessage
            //     }
            // })
            console.log(err);
        }
    }

    auth.searchUser = async function (id){
        try{
            const response = await api.getUserData(id);
           if(response.status===200){
               console.log(response.data.user)
                return response.data.user       }
            }
            catch(err){
                // authReducer({
                //     type: AuthActionType.ERROR,
                //     payload:{
                //         status:err.response.status,
                //         message:err.response.data.errorMessage
                //     }
                // })
                console.log("error of reset password");
            }
        }
        
    auth.changePassword= async function(newpassword){


        let body = {
            email:auth.user.email,
            password:newpassword
        }
        
        try{
            const response = await api.changePassword(body);
            console.log("done")
            if(response.status===200){
                console.log("done change password");
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload:response.data.user
                })
                history.push('/');
            }
        }
        catch(err){
            // authReducer({
            //     type: AuthActionType.ERROR,
            //     payload:{
            //         status:err.response.status,
            //         message:err.response.data.errorMessage
            //     }
            // })
            console.log("error of reset password");
        }
    }
    // auth.updateUser = async function (email,payload) {
    //     const response = await api.updateUser(email,payload);
    //     if(response.status === 200){
    //         authReducer({
    //             type: AuthActionType.UPDATE_USER,
    //             paylaod:null
    //         })
    //     }
    //     console.log(response);
    //     return response.data.user;
    // }
    auth.changePassword= async function(newpassword){
            let body = {
            userId:auth.user._id,
            password:newpassword
            }
            try{
            const response = await api.changePassword(body);
            if(response.status===200){
            }
            }
            catch(err){
            // authReducer({
            // type: AuthActionType.ERROR,
            // payload:{
            // status:err.response.status,
            // message:err.response.data.errorMessage
            // }
            // })
            console.log("error of change password");
            }
        }

    //update current user
    auth.updateUser=async function(){
        try{
            //console.log(auth.user);
            const response = await api.updateUser(auth.user);
            console.log(response)
            if(response.status===200){
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload:response.data.user
                })
            }
        }
        catch(err){
            // authReducer({
            //     type: AuthActionType.ERROR,
            //     payload:{
            //         status:err.response.status,
            //         message:err.response.errorMessage
            //     }
            // })
            console.log(err);
        }
    }
    //find user by email 
    auth.setTargetUser=async function(author){
        try{
           
            // let body={"email":author}; console.log(body);
            const response = await api.getOneUser(author);
            if(response.data.success){
                console.log(response.data.user);
                // authReducer({
                //     type: AuthActionType.SET_TARGET_USER,
                //     payload:response.data.user
                // })

            }
        }
        catch(err){
           
            console.log(err);
        }
    }
    auth.followAuthor=async function(authorId){
        try{       
            // get follewing user data
         
            const response = await api.getUserbyId(authorId);
            if(response.data.success){
                let user=response.data.user;
                user.follower.push(auth.user._id);
                const res=await api.updateUser(user);
                if(res.data.success){
                    console.log(auth.user._id);
                    const response = await api.getUserbyId(auth.user._id);
                    if(response.data.success){
                        let newUser=response.data.user;
                        console.log("369"+ auth.user._id);
                        newUser.following.push(authorId);
                        const respon=await api.updateUser(newUser);
                        if(respon.data.success){
                            console.log("following successfully");
                            authReducer({
                                type: AuthActionType.LOGIN_USER,
                                payload:newUser
                            })
                        }
                    }
                }
            }
        }
        catch(err){
            console.log("follow error");
        }

    }
    auth.unfollowAuthor=async function(authorId){
        try{       
            // get follewing user data
            console.log(authorId);
          
            const response = await api.getUserbyId(authorId);
            if(response.data.success){
                let user=response.data.user;
                console.log(user);
                for (let s = 0; s < user.follower.length; s++) {
                    if(user.follower[s]==auth.user._id) {
                        user.follower.splice(s,1);
                    }
                }
                const res=await api.updateUser(user);
                if(res.data.success){  
                    console.log(auth.user._id);
                    const response = await api.getUserbyId(auth.user._id);
                    if(response.data.success){
                        let newUser=response.data.user;
                        for (let i = 0; i < newUser.following.length; i++) {
                            if(newUser.following[i]==authorId) {
                                newUser.following.splice(i,1);
                            }
                        }
                        const respon=await api.updateUser(newUser);
                        if(respon.data.success){
                            console.log("unfollowing successfully");
                            console.log(newUser);
                            authReducer({
                                type: AuthActionType.LOGIN_USER,
                                payload:newUser
                            })
                        }
                    }
                }
            }
        }
        catch(err){
        
            console.log("unfollow error");
        }

    }

    auth.interact=async function(newUser){
        try{
            //console.log(auth.user);
            const response = await api.getUserbyId(newUser._id);
            if(response.data.success){
                let updatedUser=response.data.user;

               const res = await api.updateUser(updatedUser);
                if(res.data.success){
                    authReducer({
                        type: AuthActionType.LOGIN_USER,
                        payload:newUser
                    })
                }
            }
        }
        catch(err){
            console.log("interact fail");
        }
    }

    auth.ignoreWork = async function(workId){
        try{       
            const response = await api.getUserbyId(auth.user._id);
            if(response.data.success){
                let user=response.data.user;
                console.log(user);
                for (let s = 0; s < user.notification.length; s++) {
                    if(user.notification[s].type === 1 && user.notification[s].workId === workId) {
                        user.notification.splice(s,1);
                    }
                }
                const res=await api.updateUser(user);
            }
        }
        catch(err){
        
            console.log("ignore work error");
        }
    }

    
    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };