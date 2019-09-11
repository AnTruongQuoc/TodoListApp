import React, {Component} from 'react'
import './loginForm.scss'
import 'firebase/auth'
import 'firebase/firestore'
import firebase, { firestore } from 'firebase/app'
import {configDev} from '../../firebase/auth'
import {config} from '../../firebase/auth'


class LoginForm extends React.Component {
    
    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(configDev);
        }


        this.state = {
            email:'',
            password: '',
            isFailed: false,
            signedInFailed: '',
        }
    }
    
    
    
    handleSubmit = (e) => {
        e.preventDefault()
        var self = this

        this.setState({
            isFailed: false,
            signedInFailed: ''
        })

        

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(user){
            //User signed in
            self.setState({
                isFailed: false,
                signedInFailed: 'Verifying....'
            })
            console.log('Login Successssssss')
            //console.log(self.state)
        }).catch(function(error){
            //Error when signed in

            var errCode = error.code;
            var errMessage = error.message;
            
            if ((errCode === 'auth/wrong-password') || (errCode === 'auth/user-not-found')){
                self.setState({
                    isFailed: true,
                    signedInFailed: 'Your email or password is incorrect.'
                })
            }
            else  {}
            console.log(errCode, errMessage)
        })

        
        //console.log(this.state)
    }

   
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return(
            <React.Fragment>
               
                <div className='login-form'>
                    <h2 className='login-title'>LOGIN</h2>
                    <form onSubmit={this.handleSubmit} className='login-place' autoComplete='on'>
                        <div className='input lp'>
                            <i className="fas fa-user"></i>
                            <input type='email' id='email' name='email' className='user-input in' placeholder='Your E-mail' onChange={this.handleChange} required></input>
                        </div>

                        <div className='input lp'>
                            <i className="fas fa-key"></i>
                            <input type='password' id='password' className='password in' name='password' placeholder='Password' onChange={this.handleChange} required></input> 
                        </div>
                        <div className='noti-su-text'>
                            {this.state.isFailed ? <p style={{margin:0}} className='noti-si-failed'>{this.state.signedInFailed}</p> : null}
                        </div>
                        <input type='submit' id='in-submit' className='submit' value='LOGIN'></input>

                        <p className='fg-pw'>
                            <a className='fg-pw-link' href='/forgotten-password'>Forgot your password ?</a>
                        </p>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default LoginForm