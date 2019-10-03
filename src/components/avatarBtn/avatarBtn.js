import React from 'react'
import './avatarBtn.scss'
//import Fab from '@material-ui/core/Fab'
import Badge from '@material-ui/core/Badge'
import {withRouter} from 'react-router-dom'
//import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {DropdownButton, Dropdown } from 'react-bootstrap'
import Cookies from 'universal-cookie'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app'


class AvatarBtn extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = this.props.data
        console.log(this.state)
    }

    logOut = (e) => {
        e.preventDefault()
        const cookies = new Cookies()
        cookies.set('isLogin', false, { path: '/' })
        cookies.remove('tokenID', {path: '/'})
        
        const email = this.state.dbEmail,
            pass = this.state.dbPassword

        firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
            firebase.auth().signOut().then(() => {
                console.log('Sign out Successful')
                localStorage.clear()
            }).catch((error) => {
                console.log(error.message)
            })
        }).catch((err) => {
            console.log(err.message)
        })

        this.props.history.push('/')    
    }


    render() {
        return (
            <React.Fragment>
                
                <DropdownButton
                    className='custom-drd-btn'
                    alignRight
                    title={<AccountCircleIcon style={{ fontSize: 30 }} />}
                    id="dropdown-menu-align-right"
                >
                    <p className='dropdown-header' eventkey="1"><i>{this.props.name}</i></p>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="2" href='/profile'>Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="3" 
                        onClick={this.logOut}
                    >
                        Log out
                    </Dropdown.Item>
                </DropdownButton>

                <DropdownButton
                    className='custom-drd-noti'
                    alignRight
                    title={
                        <Badge badgeContent={100} color="secondary">
                            <NotificationsIcon style={{ fontSize: 24 }} />
                        </Badge>
                    }
                    id='dropdown-menu-align-right'
                >
                    <h3 className='dropdown-header' eventKey="1">Notifications</h3>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="2">nothing</Dropdown.Item>
                </DropdownButton>
            </React.Fragment>
        )
    }
}

export default withRouter(AvatarBtn)
