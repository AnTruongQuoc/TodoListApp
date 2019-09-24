import React from 'react'
import './signupForm.scss'
import 'firebase/auth'
import firebase from 'firebase/app'
import { configDev } from '../../firebase/auth'
//import { config } from '../../firebase/auth'
import {server} from '../../firebase/auth'
import axios from 'axios'


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
            suFirstName: 'An',
            suUserID: '',
            suLastName: 'Truong',
            suAvatarURL: 'nolink.com',
            suBirthDay: '03/02/2019',
            suUserPhone: '0968344544',
            suRepassword: '',
            wrongRePass: '',
            isWrongRePass: false,
            successMess: '',
            level: 'Strength',
            colorlv1: 'blank', //red, yell, green
            colorlv2: 'blank',
            colorlv3: 'blank'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var self = this

        this.setState({
            successMess: '',
            wrongRePass: ''
        })

        if (this.state.suPassword === this.state.suRepassword) {
            firebase.auth().createUserWithEmailAndPassword(this.state.suEmail, this.state.suPassword).then(function () {
                firebase.auth().currentUser.getIdToken(true).then(function (idToken) {

                    const headers = {
                        'Content-Type': 'application/json',
                        'tokenIDS': idToken,
                    };
                    
                    const path = server + '/api/user'
                    axios.post(path,
                        {
                            'email': self.state.suEmail,
                            'firstName': self.state.suFirstName,
                            'lastName': self.state.suLastName,
                            'avatarURL': self.state.suAvatarURL,
                            'birthDay': self.state.suBirthDay,
                            'userPhone': self.state.suUserPhone
                        }
                        , { headers })

                    //console.log(headers)
                    //console.log(idToken)
                }).catch(function (error) {
                    //handle error
                })



                self.setState({
                    isWrongRePass: false,
                    successMess: 'Sign-up successfully! You can login now'
                })

            }).catch(function (error) {
                var errCode = error.code
                if (errCode === 'auth/email-already-in-use') {
                    self.setState({
                        isWrongRePass: true,
                        wrongRePass: 'This email is used by another account.'
                    })
                }
                console.log(errCode, error.message)

            })
        }
        else {
            self.setState({
                isWrongRePass: true,
                wrongRePass: 'Confirm password is wrong!'
            })
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

        if (this.state.suPassword.length === 0) {
            this.setState({
                level: 'Strength',
                colorlv1: 'blank',
                colorlv2: 'blank',
                colorlv3: 'blank'
            })
            console.log(this.state.level)
        }
        else if (this.state.suPassword.length > 0 && this.state.suPassword.length < 6) {
            this.setState({
                level: 'Weak',
                colorlv1: 'red',
                colorlv2: 'blank',
                colorlv3: 'blank'
            })
            console.log(this.state.level)
        }
        else if (this.state.suPassword.length >= 6 && this.state.suPassword.length < 12) {
            this.setState({
                level: 'Normal',
                colorlv1: 'yell',
                colorlv2: 'yell',
                colorlv3: 'blank'
            })
            console.log(this.state.level)
        }
        else if (this.state.suPassword.length >= 12) {
            this.setState({
                level: 'Strong',
                colorlv1: 'green',
                colorlv2: 'green',
                colorlv3: 'green'
            })
            console.log(this.state.level)
        }

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
                            {/* <div className='pw-strength-area'>
                                <div className='pw-lv'>
                                    <p className='pw-lv-text'>{this.state.level}:</p>
                                    <div id='pw-lv1' className={this.state.colorlv1}></div>
                                    <div id='pw-lv2' className={this.state.colorlv2}></div>
                                    <div id='pw-lv3' className={this.state.colorlv3}></div>
                                </div>
                            </div> */}
                            <div className='confirm-pw'>
                                <input type='password' id='suRepassword' className='suf' name='confirm password' placeholder='Confirm Password' autoComplete='off' onChange={this.handleChange} required />
                            </div>

                            <input type='submit' className='submit-suf' value='SIGN UP' />
                            <div className='su-mess-noti'>
                                {
                                    this.state.isWrongRePass
                                        ? <p className='su-noti-wrong'>{this.state.wrongRePass}</p>
                                        : <p className='su-noti-success'>{this.state.successMess}</p>
                                }
                            </div>
                        </form>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SignUpForm