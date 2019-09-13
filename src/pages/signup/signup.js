import React from 'react'
import './signup.scss'
import SignUpForm from '../../components/signupPage/signupForm'


class SignupPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className='SignUpPage'>
                    <div className='sup-con-left'>
                        <div className='logo-container'>
                            <div className='logo'>TodoListApp</div>

                            <a className='sup-btn-login' href='/login'>LOGIN</a>
                        </div>

                        
                        <SignUpForm></SignUpForm>

                    </div>

                    <div className='sup-img-right'>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SignupPage