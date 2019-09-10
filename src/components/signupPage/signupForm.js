import React from 'react'
import './signupForm.scss'

class SignUpForm extends React.Component {
    render() {
        return(
            <React.Fragment>
                <div className='sign-up-area'>
                    <h2 className='su-title'>SIGN UP</h2>
                    <p className='su-noti'>Please input your information to sign up.</p>
                    <div className='su-div'>
                        <form className='su-form'>
                            <div className='username'> 
                                <input type='text' className='suf' name='username' placeholder='Username' required/>
                            </div>
                            <div className='email'>
                                <input type='email' className='suf' name='email' placeholder='Your E-mail' required/>
                            </div>
                            <div className='fullname'>
                                <input type='text' className='suf' name='fullname' placeholder='Your Fullname' required/>
                            </div>
                            <div className='dob'>
                                <input type='text' className='suf' name='dob' placeholder='Date of birth' required/>
                            </div>
                            <div className='sex'> Sex : 
                                
                                <label> Female
                                    <input type='radio' name='female' value='female' required/>
                                    <span className='checkmark'></span>
                                </label>

                                <label> Male
                                    <input type='radio' name='male' value='male' required/>
                                    <span className='checkmark'></span>
                                </label>

                            </div>    

                            <div className='password'>
                                <input type='password' className='suf' name='password' placeholder='Password' required/>
                            </div>
                            <div className='confirm-pw'>
                                <input type='password' className='suf' name='confirm password' placeholder='Confirm Password' required/>
                            </div>

                            <input type='submit' className='submit-suf' value='SIGN UP'/>
                           
                        </form>

                    </div>
                </div>    
            </React.Fragment>
        )
    }
}

export default SignUpForm