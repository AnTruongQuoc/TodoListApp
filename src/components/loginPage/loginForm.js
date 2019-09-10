import React from 'react'
import './loginForm.scss'

class LoginForm extends React.Component {
    render() {
        return(
            <React.Fragment>
               
                <div className='login-form'>
                    <h2 className='login-title'>LOGIN</h2>
                    <form className='login-place'>
                        <div className='input lp'>
                            <i class="fas fa-user"></i>
                            <input type='text' name='username' className='user-input in' placeholder='Username' required></input>
                        </div>

                        <div className='input lp'>
                            <i class="fas fa-key"></i>
                            <input type='password' className='password in' name='password' placeholder='Password' required></input> 
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