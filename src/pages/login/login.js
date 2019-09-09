import React from 'react'
import './login.scss'
import LoginForm from '../../components/loginPage/loginForm'
class LoginPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className='login'>
                    <div className='img-left'>
                        <div className='bg-cover'>
                            <div className='logo-container'>
                                <div className='logo'>TodoListApp</div>
                            </div>
                            
                            <div className='text-container'>
                                <div className='text'>
                                    <h2 className='big-text'>Welcome,</h2>
                                    <p className='sm-text'>To keep Connected with us  
                                        please login to your account. <br/>
                                        And you can see what you can do.
                                    </p>

                                    <p className='signup-noti'>
                                        If you don't have an account, you can sign up here.
                                    </p>

                                    <div className='btn-signup'>
                                        <a className='btn' href='/signup'>SIGN UP</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className='login-area'>
                        <LoginForm></LoginForm>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LoginPage