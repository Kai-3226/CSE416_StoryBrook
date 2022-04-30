import './App.css';

import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import { AuthProvider } from './auth'


import {
    AppBanner,
    SplashScreen,
    ForgetPassword,
    RegisterScreen,
    HomeScreen,
    ViewScreen,
    HomeScreen2,
    ResetPassword,
    StoryCreate
} from './components'
import LoginScreen from './components/LoginScreen'
import CreateScreen from './components/CreateScreen'
import MessageScreen from './components/MessageScreen';
import ReadScreen from './components/ReadScreen';
import CreatePageBanner from './components/CreatePageBanner' ;
import MypageScreen from './components/MypageScreen';
import ProfileScreen from './components/MypageProfile'
import ReadStory from './components/ReadStory';
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                    <AppBanner />
                    <Switch>
                        <Route path="/" exact component={SplashScreen} />
                        <Route path="/home/" exact component = {HomeScreen} />
                        <Route path="/view/" exact component = {ViewScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/create/" exact component={CreateScreen} />
                        <Route path="/message/" exact component={MessageScreen} />
                        <Route path="/read/:id" exact component={ReadScreen} />
                        <Route path="/readStory/:id" exact component={ReadStory} />
                        <Route path="/myPage/" exact component={MypageScreen}/>
                        <Route path="/requestPasswordReset/" exact component={ForgetPassword}/>
                        <Route path="/passwordReset/:token/:id" exact component={ResetPassword}/>
                        <Route path="/profile/" exact component={ProfileScreen}/>
                        <Route path="/createStory/" exact component={StoryCreate} />               
                    </Switch>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App