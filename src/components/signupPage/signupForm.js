import React from 'react'
import './signupForm.scss'
import 'firebase/auth'
import firebase from 'firebase/app'
import { configDev } from '../../firebase/auth'
import { config } from '../../firebase/auth'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(configDev);
        }

        this.state = {
            suEmail: '',
            suUser: '',
            suPassword: '',
            suRepassword: '',
            wrongRePass: '',
            isWrongRePass: false,
            successMess:''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var self = this

        if (this.state.suPassword === this.state.suRepassword) {
            firebase.auth().createUserWithEmailAndPassword(this.state.suEmail, this.state.suPassword).then(function () {
                self.setState({
                    isWrongRePass: false,
                    successMess: 'Sign-up successfully! You can login now'
                })
            }).catch(function (error) {
                //do something here
            })
        }
        else {
            self.setState({
                isWrongRePass: true,
                wrongRePass:'Confirm password is wrong!'
            })
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className='sign-up-area'>
                    <h2 className='su-title'>SIGN UP</h2>
                    <p className='su-noti'>Please input your information to sign up.</p>
                    <div className='su-div'>
                        <form onSubmit={this.handleSubmit} className='su-form' id='__signup-form' autoComplete='on'>
                            <div className='username'>
                                <input type='text' id='suUser' className='suf' name='username' placeholder='Username' autoComplete='on' onChange={this.handleChange} required />
                            </div>
                            <div className='email'>
                                <input type='email' id='suEmail' className='suf' name='email' placeholder='Your E-mail' autoComplete='off' onChange={this.handleChange} required />
                            </div>

                            <div className='password'>
                                <input type='password' id='suPassword' className='suf' name='password' placeholder='Password' autoComplete='off' onChange={this.handleChange} required />
                            </div>
                            <div className='confirm-pw'>
                                <input type='password' id='suRepassword' className='suf' name='confirm password' placeholder='Confirm Password' autoComplete='off' onChange={this.handleChange} required />
                            </div>

                            <input type='submit' className='submit-suf' value='SIGN UP' />
                            <div>
                                {this.state.isWrongRePass ? <p>{this.state.wrongRePass}</p> : <p>{this.state.successMess}</p>} 
                            </div>
                        </form>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SignUpForm