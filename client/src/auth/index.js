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
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: false
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
                history.push("/home");
                store.loadIdNamePairs();
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
                history.push("/home");
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
            console.log("error of sent reset email");
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
            console.log("error of sent reset email");
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