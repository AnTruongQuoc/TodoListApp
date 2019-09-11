import React, {Component} from 'react'
import './loginForm.scss'
import 'firebase/auth'
import 'firebase/firestore'
import firebase, { firestore } from 'firebase/app'

const config= {
    apiKey: "AIzaSyApZD1LrfqPZcbBDKyccpjCzxbeaanNKdo",
    authDomain: "todolist-demotest.firebaseapp.com",
    databaseURL: "https://todolist-demotest.firebaseio.com",
    projectId: "todolist-demotest",
    storageBucket: "todolist-demotest.appspot.com",
    messagingSenderId: "678656591916",
    appId: "1:678656591916:web:1b8931fcda502496542989"
};

class LoginForm extends React.Component {
    
    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }


        this.state = {
            email:'',
            password: '',
            isFailed: false,
            signedInFailed: 'Wrong password'
        }
    }
    
    
    
    handleSubmit = (e) => {
        e.preventDefault()
        
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(user){
            //User signed in
            
        }).catch(function(error){
            //Error when signed in

            var errCode = error.code;
            var errMessage = error.message;
            
            if (errCode == 'auth/wrong-password'){
                this.setState({
                    isFailed: true
                })
            }
            else  {}
            console.log(errCode, errMessage)
        })
        console.log(this.state)
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
                            {this.state.isFailed ? <p>{this.state.signedInFailed}</p> : null}
                        </div>
                        <input type='submit' className='submit' value='LOGIN'></input>

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