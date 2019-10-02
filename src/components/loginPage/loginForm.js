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
import { server } from '../../firebase/auth'



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
            userPhone: '0909090909',
            isFailed: false,
            signedInFailed: '',
            isLogined: cookies.get('isLogin'),
            isAdmin: false
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

        let self = this

        this.setState({
            isFailed: false,
            signedInFailed: ''
        })

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
            //User signed in
            self.setState({
                isFailed: false,
                signedInFailed: 'Verifying....',

            })
            firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
                //send token to Backend via HTTP
                const tokenID = idToken
                localStorage.setItem('tokenID', idToken)

                const cookies = new Cookies()
                cookies.set('tokenID', idToken, { path: '/' })

                const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'tokenID': tokenID,
                };

                const path = server + '/api/user'
                axios.get(path, { headers }).then(res => {
                    //Do sth here
                    console.log('User infoooooo:', res.data)

                    if (res.data.typeUser === 'admin') {
                        console.log('checking inside:', res.data)
                        const cookies = new Cookies()
                        cookies.set('isLogin', true, { path: '/' })
                        cookies.set('isAdmin', true, { path: '/' })

                        let pathAD = server + '/api/admin'

                        axios.get(pathAD, { headers }).then((res) => {
                            console.log(res)
                        }).catch((err) => {
                            console.log(err.message)
                        })
                    }
                    else {
                        console.log('Setting cookies')
                        const cookies = new Cookies()
                        cookies.set('isLogin', true, { path: '/' })
                        cookies.set('isAdmin', false, { path: '/' })
                        self.setState({
                            isLogined: cookies.get('isLogin')
                       })
                       self.forceUpdate()
                    }
                    console.log('Chuan bi ra ngoai')
                }).catch((err) => {

                    //Show error
                    //alert('Server is down. Please try later')
                    console.log(err)
                })


            }).catch(function (error) {
                //error here
            })

            //self.checkLoginStatus()
            localStorage.setItem('email', self.state.email)
            localStorage.setItem('password', self.state.password)

            //Set Cookies for Login
            //const cookies = new Cookies()
            // cookies.set('isLogin', true, { path: '/' })

            console.log('Chuan bi setState')
            
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
        const admin = cookies.get('isAdmin')
        console.log('status: ', status)
        console.log('AMDIN:', this.state.isAdmin)

        if (status === 'true'){
            if (admin === 'false'){
                return <Redirect to='/dashboard' />
            }
            else if (admin === 'true'){
                console.log('Hey! Im Admin')
                window.location.href = 'http://192.168.2.49:4000/api/admin'
            }
            else {
                console.log('NULLLLLL')
            }
        }
    }



    render() {
        return (
            <React.Fragment>

                {this.checkLoginStatus()}
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