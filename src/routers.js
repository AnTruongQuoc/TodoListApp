import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/home/homepage'
import LoginPage from './pages/login/login'
import SignupPage from './pages/signup/signup'

const MainRouter = () => (
    <main>
        <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route path='/login' component={LoginPage}></Route>
            <Route path='/signup' component={SignupPage}></Route>
        </Switch>
    </main>
)

export default MainRouter