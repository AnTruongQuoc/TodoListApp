import React from 'react'
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router-dom'

class AuthHome extends React.Component {
    constructor(props) {
        super(props)

        const cookies = new Cookies()

        this.state= {
            logined: cookies.get('isLogin')
        }
    }

    renderRedirect() {
        console.log(this.state.logined)
        if (this.state.logined === 'true') {
            return <Redirect to={this.props.orRedirectTo}></Redirect>
        }
        else {
            return this.props.orRender
        }
    }


    render() {
        return (
            <React.Fragment>
                {this.renderRedirect()}
            </React.Fragment>
        )
    }
}

export default AuthHome
