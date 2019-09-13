import React, { Component } from 'react'
import './loginForm.scss'
import 'firebase/auth'
import 'firebase/firestore'
import firebase, { firestore } from 'firebase/app'
import { configDev } from '../../firebase/auth'
import { config } from '../../firebase/auth'
import Cookies from 'universal-cookie'
import axios from 'axios'

class LoginForm extends React.Component {

    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(configDev);
        }


        this.state = {
            email: '',
            password: '',
            isFailed: false,
            signedInFailed: ''
        }
    }

    componentDidMount() {
        let self = this
        
        axios.get('192.168.2.48:4000/api/user/list')
            .then(function (response) {
                // handle success
                console.log(response);
                let els = response.data.members.map((key, index) => {
                    return (
                        <li key={index}>{key.name} - {key.class}</li>
                    )
                })
                self.setState({
                    response: els
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }


    handleSubmit = (e) => {
        e.preventDefault()
        var self = this

        this.setState({
            isFailed: false,
            signedInFailed: ''
        })
        const cookies = new Cookies()
        console.log(cookies.get('isLogin'))
        console.log(cookies.get('isOff'))

        

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
            //User signed in
            self.setState({
                isFailed: false,
                signedInFailed: 'Verifying....'
            })

            firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
                //send token to Backend via HTTP
                const tokenID = idToken
                const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'tokenID': tokenID,
                  };
                axios.get('http://192.168.2.48:4000/api/user', {headers})
                
               
                console.log(idToken)
            }).catch(function (error) {
                //error here
            })

            console.log('Login Successssssss')
            //console.log(self.state)
        }).catch(function (error) {
            //Error when signed in

            var errCode = error.code;
            var errMessage = error.message;

            if ((errCode === 'auth/wrong-password') || (errCode === 'auth/user-not-found')) {
                self.setState({
                    isFailed: true,
                    signedInFailed: 'Your email or password is incorrect.'
                })
            }
            else { }
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
        return (
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
                            {this.state.isFailed ? <p style={{ margin: 0 }} className='noti-si-failed'>{this.state.signedInFailed}</p> : null}
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