import React from 'react'
import './login.scss'
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
                                    <p classsName='sm-text'>To keep Connected with us  
                                        please login to your accout.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className='login-form'>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LoginPage