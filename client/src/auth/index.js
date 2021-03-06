import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import api from '../api';


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
    SET_TARGET_USER: "SET_TARGET_USER",
    FOLLOWING: "FOLLOWING"

}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: false,
        userList:[],
        targetUser:null
    });
    const history = useHistory();
    

 
    useEffect(() => {
        if(!auth.loggedIn){
        console.log("log in");
        auth.getLoggedIn();}
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: false,
                    targetUser:null,
                    userList: []

                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    targetUser:null,
                    userList: []

                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user:null,
                    loggedIn: false,
                    error: false,
                    targetUser:null,
                    userList: []
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user:payload,
                    loggedIn:true,
                    error:false,
                    targetUser:null,
                    userList: []
                })
            }
            case AuthActionType.ERROR: {
                return setAuth({
                    user:auth.user,
                    loggedIn:auth.loggedIn,
                    error:payload,
                    targetUser:auth.targetUser,
                    userList: auth.userList
                })
            }
            case AuthActionType.UPDATE_USER: {
                return setAuth({
                    user:payload,
                    loggedIn:auth.loggedIn,
                    error:false,
                    targetUser:auth.targetUser,
                    userList: auth.userList
                })
            }
            case AuthActionType.SET_TARGET_USER: {
                return setAuth({
                    user:auth.user,
                    loggedIn:auth.loggedIn,
                    error:false,
                    targetUser:payload,
                    userList: auth.userList
                })
            }
            case AuthActionType.FOLLOWING: {
                console.log("Following")
                return setAuth({
                    user:auth.user,
                    loggedIn:auth.loggedIn,
                    error:false, 
                    targetUser:auth.targetUser,
                    userList: payload
                })
            }
            default:
                return setAuth({
                    user:null,
                    loggedIn:false,
                    error:false,
                    userList: []
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
        try{const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user,
                }
            });
        }}
        catch(err){
            console.log("no token can be use to login");
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
        history.push("/");
        const response = await api.logoutUser();
        if(response.status === 200){
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload:null
            })
           
            console.log("logout user");
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
            authReducer({
                type: AuthActionType.ERROR,
                payload:{
                    status:err.response.status,
                    message:err.response.data.errorMessage
                }
            })
        }
    }
    auth.getUserList = async function(){
        try{
            const response = await api.getUsers();
            console.log(response.data.users);
            if(response.status===200){
                    authReducer({
                        type: AuthActionType.FOLLOWING,
                        payload:response.data.users
                    });
            }
        }
        catch(err){
            console.log("getUserListError");
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
               
            }
        }
        
    // auth.updateUser = async function (email,payload) {
    //     const response = await api.updateUser(email,payload);
    //     if(response.status === 200){
    //         authReducer({
    //             type: AuthActionType.UPDATE_USER,
    //             payload:null
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

    auth.updateUserIcon =async function(payload){
        try{
            //console.log(auth.user);
            const response = await api.updateUserIcon(payload);
            if(response.data.success){
                let newdata=response.data.user;
                console.log(auth.user);
                const res = await api.updateUser(newdata);
                if(res.data.success){
                    console.log(res.data.user);
                    authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload:res.data.user
                })
             }
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
            console.log("upload icon error");
        }
    }

    //find user by email 
    auth.setTargetUser=async function(authorId){
        try{
           
            // let body={"email":author}; console.log(body);
            const response = await api.getUserbyId(authorId);
            if(response.data.success){
                authReducer({
                    type: AuthActionType.SET_TARGET_USER,
                    payload:response.data.user
                })

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
                console.log(user.email);
                user.follower.push(auth.user._id);
                console.log(user);
                const res=await api.updateUser(user);
                if(res.data.success){
                    
                    const respons = await api.getUserbyId(auth.user._id);
                    if(respons.data.success){
                        let newUser=respons.data.user;
                      
                        newUser.following.push(authorId);
                        const respon=await api.updateUser(newUser);
                        if(respon.data.success){
                            console.log("following successfully");
                            authReducer({
                                type: AuthActionType.LOGIN_USER,
                                payload:respon.data.user
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
    
                for (let s = 0; s < user.follower.length; s++) {
                    if(user.follower[s]===auth.user._id) {
                        user.follower.splice(s,1);
                    }
                }
                const res=await api.updateUser(user);
                if(res.data.success){  
                    //console.log(auth.user._id);
                    const response = await api.getUserbyId(auth.user._id);
                    if(response.data.success){
                        let newUser=response.data.user;
                        for (let i = 0; i < newUser.following.length; i++) {
                            if(newUser.following[i]===authorId) {
                                newUser.following.splice(i,1);
                            }
                        }
                        const respon=await api.updateUser(newUser);
                        if(respon.data.success){
                            console.log("unfollowing successfully");
                            authReducer({
                                type: AuthActionType.LOGIN_USER,
                                payload:respon.data.user
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
            console.log(workId);       
            const response = await api.getUserbyId(auth.user._id);
            if(response.data.success){
                let user=response.data.user;
                console.log(response.data.user);
                for (let s = 0; s < user.notification.length; s++) {
                    console.log(user.notification[s].workId);  
                    if(user.notification[s].workId === workId) {
                        user.notification.splice(s,1);
                    }
                }
                const res=await api.updateUser(user);
                if(res.data.success){
                    authReducer({
                        type: AuthActionType.UPDATE_USER,
                        payload:user
                    })
                }               
            }
        }
        catch(err){
        
            console.log("ignore work error");
        }
    }

    auth.sendNotification=async function(workId, workType,workName){
        try{
            console.log(auth.user);
            let notification = {"userId": auth.user._id,
                                "userName": auth.user.profile.userName, 
                                "workId": workId,
                                "workType": workType,
                                "workName": workName
                            };
            console.log(notification);    
            for(let i=0; i<auth.user.follower.length; i++){
                const response = await api.getUserbyId(auth.user.follower[i]);
                if(response.data.success){
                    let user = response.data.user;
                    console.log(user);
                    user.notification.push(notification);
                    const respon = await api.updateUser(user);
                    if(respon.data.success){
                        console.log("notification send successfully");
                        console.log(respon.data.user);
                    }
                }
            }
        }
        catch(err){
            console.log("send notification error");
        }
    }
    auth.loadNotification= async function(){
        try{     
            const response = await api.getUserbyId(auth.user._id);
            if(response.data.success){
                let user=response.data.user;
                    authReducer({
                        type: AuthActionType.UPDATE_USER,
                        payload:user
                    })             
            }
        }
        catch(err){
        
            console.log("load notification error");
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
