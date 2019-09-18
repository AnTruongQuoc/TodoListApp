import React from 'react'
import './forgot-pw.scss'
//import LoginForm from '../loginForm'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app'
import {configDev} from '../../../firebase/auth'
//import {config} from '../../../firebase/auth'
import Cookies from 'universal-cookie'
class ForgotPassword extends React.Component {
    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(configDev)
        }

        
        const cookies = new Cookies()
        // cookies.set('isLogin', true, {path:'/'})
        // cookies.set('isOff', false, {path: '/'})
        

        this.state = {
            resetEmail: '',
            message: '',
            cssMess:'',
            isSuccess: false,
            isShowMess: false,
            isLogin: cookies.get('isLogin')
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        console.log(this.state.isLogin)
        
        var self = this

        this.setState({
            
        })

        firebase.auth().sendPasswordResetEmail(this.state.resetEmail).then(function () {
            self.setState({
                isShowMess: true,
                cssMess:'email-success',
                message:'Successful! Please check your email.'
            })

            console.log('Checking your email', this.state.reSent)
        }).catch(function (error) {
            var errCode = error.code

            if (errCode === 'auth/user-not-found'){
                self.setState({
                    isShowMess: true,
                    cssMess: 'email-fail',
                    message:'Your email is invalid. Please try again!'
                })
            }

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
                <div className='fpw-container'>
                    <header className='fpw-header'>
                        <ul className='nav'>
                            <li className='logo'>TodoListApp</li>
                            <li className='log-in dec'><a className='login-link' href="/login" >Log in</a></li>
                            <li className='sign-up dec'><a className='signup-link' href="/signup" >Sign up</a></li>
                        </ul>
                    </header>

                    <div className='fpw-area'>
                        <h2 className='fpw-title'> Reset Your TodoListApp Password</h2>
                        <p className='fpw-noti'>Please input your email. We will send a reset password link to your email.</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className='fpw-email'>
                                <input type='email' id='resetEmail' className='fpw-in-email' name='email' placeholder='Your E-mail' autoComplete='on' onChange={this.handleChange} required/>
                            </div>
                            <input type='submit' id='fpw-btn-submit' className='fpw-submit' value='SEND' />
                            <div className='noti-email-success'>
                                {this.state.isShowMess ? <p className={this.state.cssMess}>{this.state.message}</p> : null}
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ForgotPassword