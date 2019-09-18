import React from 'react'
import './loginForm.scss'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app'
import { configDev } from '../../firebase/auth'
//import { config } from '../../firebase/auth'
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import axios from 'axios'



class LoginForm extends React.Component {

    constructor(props) {
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(configDev);
        }

        const cookies = new Cookies()
        this.state = {
            email: '',
            password: '',
            firstName: '',
            userIDs: '',
            lastName: '',
            avatarURL: '',
            birthDay: '',
            userPhone: '',
            isFailed: false,
            signedInFailed: '',
            isLogined: cookies.get('isLogin')
        }
    }

    // componentDidMount() {
    //     let self = this

    //     axios.get('192.168.2.48:4000/api/user/list')
    //         .then(function (response) {
    //             // handle success
    //             console.log(response);
    //             let els = response.data.members.map((key, index) => {
    //                 return (
    //                     <li key={index}>{key.name} - {key.class}</li>
    //                 )
    //             })
    //             self.setState({
    //                 response: els
    //             })
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    //         .finally(function () {
    //             // always executed
    //         });
    // }

    handleSubmit = (e) => {
        e.preventDefault()
        var self = this

        this.setState({
            isFailed: false,
            signedInFailed: ''
        })

        // const cookies = new Cookies()
        // console.log(cookies.get('isLogin'))
        // console.log(cookies.get('isOff'))



        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
            //User signed in
            self.setState({
                isFailed: false,
                signedInFailed: 'Verifying....'
            })

            //Set Cookies for Login
            const cookies = new Cookies()
            cookies.set('isLogin', true, { path: '/' })



            firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
                //send token to Backend via HTTP
                const tokenID = idToken

                const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'tokenID': tokenID,
                };
                axios.get('http://192.168.2.48:4000/api/user', { headers }).then(res => {
                    
                    console.log(res.data.userID)
                    
                    // self.setState({

                    //     firstName: 'helloTest',
                    //     userIDs: res.data.userID,
                    //     lastName: res.data.lastName,
                    //     avatarURL: res.data.avatarURL,
                    //     birthDay: res.data.birthDay,
                    //     userPhone: res.data.userPhone
                    // })
                    // console.log(self.state)
                })



                console.log(idToken)
            }).catch(function (error) {
                //error here
            })

            self.props.history.push({
                pathname: '/dashboard',
                state: {
                    email: self.state.email,
                    password: self.state.password,
                    firstName: self.state.firstName,
                    userID: self.state.userID,
                    lastName: self.state.lastName,
                    avatarURL: self.state.avatarURL,
                    birthDay: self.state.birthDay,
                    userPhone: self.state.userPhone
                }
            })

            // const {history} = self.props;
            // history.push('/dashboard')


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

    checkLoginStatus() {
        const cookies = new Cookies()
        const status = cookies.get('isLogin')
        if (status === 'true')
            return true
        else {
            return false
        }
    }


    render() {
        return (
            <React.Fragment>

                {this.checkLoginStatus() ? <Redirect to='/dashboard' /> : console.log(this.state.isLogined)}
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



export default withRouter(LoginForm)