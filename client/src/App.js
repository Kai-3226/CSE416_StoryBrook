import './App.css';
import './harry.css';
import './xiyhu.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    SplashScreen,
    ForgetPassword,
    RegisterScreen,
    Statusbar,
    HomeScreen,
    ChangePassword
} from './components'
import LoginScreen from './components/LoginScreen'
import CreateScreen from './components/CreateScreen'
import MessageScreen from './components/MessageScreen';
import ReadScreen from './components/ReadScreen';
import CreatePageBanner from './components/CreatePageBanner' ;
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
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/forgetPassword/" exact component={ForgetPassword}/>
                        <Route path="/changepassword/" exact component={ChangePassword}/>
                    </Switch>
                    
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App