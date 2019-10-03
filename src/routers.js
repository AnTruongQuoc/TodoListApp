import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/home/homepage'
import LoginPage from './pages/login/login'
import SignupPage from './pages/signup/signup'
import ForgotPassword from './components/loginPage/forgotten-password/forgot-pw'
import Auth from './components/auth/auth-component'
import AuthHome from './components/auth/auth-home'
//import {Redirect} from 'react-router-dom'
import DashBoard from './pages/dashboard/dashboard'
import TaskList from './pages/tasklist/tasklist'
import errPage from './pages/404page/404page'
import Profile from './pages/profile/profile'

const MainRouter = () => (
    <main>
        <Switch>
            
            <Route exact path='/' render={
                () => (
                    <AuthHome orRedirectTo='/dashboard' orRender={
                        <HomePage></HomePage>   
                    }>         
                    </AuthHome>
                )
            }/>

            <Route exact path='/dashboard' render={
                () => (
                    <Auth orRedirectTo='/login' orRender={
                        <DashBoard value={LoginPage.data}></DashBoard>
                    }>         
                    </Auth>
                )
            } ></Route>

           
            <Route exact path='/login' component={LoginPage}></Route>
            <Route exact path='/signup' component={SignupPage}></Route>
            <Route exact path='/forgotten-password' component={ForgotPassword}/>
            <Route exact path='/b/:pos/:id/:name' component={TaskList}></Route>
            {/* <Route path='/admin' component={() => { 
                    //window.location.href = 'http://192.168.2.49:4000/api/admin'; 
                    return null;
            }}/> */}
            <Route exact path='/profile' component={Profile}></Route>
            <Route component={errPage}></Route>
        </Switch>
    </main>
)

export default MainRouter