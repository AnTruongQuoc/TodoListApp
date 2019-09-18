import React from 'react'
import './dashboard.scss'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app'
import {configDev} from '../../firebase/auth'


const SignOutBtn = withRouter(({ history }) => (true) ?
    <button className='btn-lgout' type='button' onClick={() => {
        
        const cookies = new Cookies()
        cookies.set('isLogin', false, { path: '/' })

        firebase.auth().signOut().then(() => {
            console.log('Sign out Successful')
        }).catch((error) => {
            console.log(error.message)
        })
        
        history.push('/')
    }}>
        LOG OUT
        </button> : null
)

class DashBoard extends React.Component {
    constructor(props) {
        super(props)


        if (!firebase.apps.length) {
            firebase.initializeApp(configDev);
        }


        console.log(this.props)
        this.state = {
            dbEmail: this.props.location.state.email,
            dbPassword: this.props.location.state.password,
            signOut: false,
        }
        console.log(this.state)

    }

    gettingInfoUser(){
        const fbEmail = this.state.dbEmail
        const  fbPassword = this.state.dbPassword
        firebase.auth().signInWithEmailAndPassword(fbEmail, fbPassword).then(() => {
            
        })
    }

    checking() {
        //e.preventDefault()
        console.log(this.props.location)
        console.log(this.state)
        this.gettingInfoUser()
    }

    render() {
        return (
            <React.Fragment>
                <div className='boards'>
                    <div className='nav-board'>
                        <div className='nav-board-c1'>
                            <button className='btn-home' type='button' onClick={this.checking()}>
                                <i className="fas fa-home fa-2x" />
                            </button>

                        </div>
                        <div className='nav-board-c2'>
                            <div className='nav-board-title'>
                                <h5 className='nav-h5-btitle'>TodoListApp</h5>
                            </div>
                        </div>
                        <div className='nav-board-c3'>
                            <SignOutBtn />
                        </div>
                    </div>

                    <div className='body-board'>
                        <p className='wel-title'>Welcome, <b>{this.props.location.state.email} </b>  !</p>

                        <div className='bboard-area'>
                            <div className='b-nav-vertical'>
                                
                                <div className='b-btn-boards'>
                                    <a className='a-boards' href='/dashboard'>
                                    
                                        <i className="far fa-calendar-alt"></i>
                                        Boards
                               
                                    </a>
                                </div>
                                
                            </div>

                            <div className='b-list-hor'>
                                <h5 className='bl-title'>Your Boards</h5>
                                <ul className='boards-section-list'>
                                    <li className='boards-detail-section-list'>
                                        <div className='btn-create-boards'>
                                            <button className='btn-cboard' type='button'> 
                                                Creat New Board
                                            </button>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(DashBoard)
