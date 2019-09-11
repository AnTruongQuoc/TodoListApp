import React from 'react'
import './signupForm.scss'
import 'firebase/auth'
import firebase from 'firebase/app'

const config= {
    apiKey: "AIzaSyApZD1LrfqPZcbBDKyccpjCzxbeaanNKdo",
    authDomain: "todolist-demotest.firebaseapp.com",
    databaseURL: "https://todolist-demotest.firebaseio.com",
    projectId: "todolist-demotest",
    storageBucket: "todolist-demotest.appspot.com",
    messagingSenderId: "678656591916",
    appId: "1:678656591916:web:1b8931fcda502496542989"
  };

class SignUpForm extends React.Component {
    constructor(props){
        super(props)

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
         }
        
        
    }   

    onSubmit = (e) => {
       console.log(e)
    }

    onChange = (e) => {
        console.log(e)
    }

    onClick = event => {
        const email = document.getElementById('signup-email').value
        , password = document.getElementById('signup-password').value
        , repassword = document.getElementById('signup-repassword').value

        console.log(email, password)

            this.setState({
                email: email,
                password: password,
                repassword: repassword
            })
            
            
            const auth = firebase.auth()
            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                console.log(cred);
            })
        
    }

    
    render() {
        return(
            <React.Fragment>
                <div className='sign-up-area'>
                    <h2 className='su-title'>SIGN UP</h2>
                    <p className='su-noti'>Please input your information to sign up.</p>
                    <div className='su-div'>
                        <form onSubmit={this.onSubmit()} className='su-form' id='__signup-form' autoComplete='on'>
                            <div  className='username'> 
                                <input type='text' id='signup-username' className='suf' name='username' placeholder='Username' autoComplete='on' required/>
                            </div>
                            <div className='email'>
                                <input type='email' id='signup-email' className='suf' name='email' placeholder='Your E-mail' autoComplete='off' required/>
                            </div>
                            <div className='fullname'>
                                <input type='text' className='suf' name='fullname' placeholder='Your Fullname' autoComplete='on' required/>
                            </div>
                            <div className='dob'>
                                <input type='text' className='suf' name='dob' placeholder='Date of birth' autoComplete='on' required/>
                            </div>
                            

                            <div className='password'>
                                <input type='password' id='signup-password' className='suf' name='password' placeholder='Password' autoComplete='off' required/>
                            </div>
                            <div className='confirm-pw'>
                                <input type='password' id='signup-repassword' className='suf' name='confirm password' placeholder='Confirm Password' autoComplete='off' required/>
                            </div>

                            <input type='submit' className='submit-suf' value='SIGN UP' onClick={(e) => this.onClick()}/>
                           
                        </form>

                    </div>
                </div>    
            </React.Fragment>
        )
    }
}

export default SignUpForm