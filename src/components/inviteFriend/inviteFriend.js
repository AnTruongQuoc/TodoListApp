import React, { Component } from 'react'
import './inviteFriend.scss'
import {DropdownButton, Dropdown } from 'react-bootstrap'
import {server} from '../../firebase/auth'
import axios from 'axios'
import { withSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

//Material-UI custom------------------------
const useStyles = makeStyles({
    icon: {
        color: '#fff'
    }
})

const CloseBtn = () => {
    const classes = useStyles()
    return (
        <CloseIcon className={classes.icon} style={{ fontSize: 20 }} />
    )
}

export class inviteFriend extends Component {
    constructor(props){
        super(props)
        this.state = {
            emailInvite: ''
        }
    }
    handleEmailInvite = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    sendInvite = (e) => {
        e.preventDefault()

        const idToken = localStorage.getItem('tokenID')
        const headers = {
            'Content-Type': 'application/json',
            'tokenID': idToken,
        };

        const boardID = this.props.boardID
        const path = server + '/api/user/board/' + boardID + '/invite'
        axios.put(path, {
            'email': this.state.emailInvite
        }, { headers })
        .then(res => {

            console.log('Request Invite', res.data)
            const pos = res.data.invited.length - 1
            window.OneSignal.push(() => {
                window.OneSignal.sendTags({
                    email: res.data.invited[pos]
                })
                .then((tags) => {
                    console.log('Tag ne: ', tags)
                })
            })
            //SNACKBAR -TESTING
            const action = (key) => {
                return (
                    <React.Fragment>
                        <IconButton onClick={() => { this.props.closeSnackbar(key) }}>
                            <CloseBtn />
                        </IconButton>
                    </React.Fragment>
                )
            }
            this.props.enqueueSnackbar('Your invitation was sent.', {
                variant: 'success',
                action
            })
            
        }).catch((err) => {
            console.log(err)

            //SNACKBAR -TESTING
            const action = (key) => {
                return (
                    <React.Fragment>
                        <IconButton onClick={() => { this.props.closeSnackbar(key) }}>
                            <CloseBtn />
                        </IconButton>
                    </React.Fragment>
                )
            }
            this.props.enqueueSnackbar('Failed to send invitation.', {
                variant: 'error',
                action
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <DropdownButton
                    className='custom-drd-invite'
                    alignLeft
                    title='Invite'
                    id="dropdown-menu-align-left"
                >
                    <h3 className='dropdown-header' eventkey="1">Invite to board</h3>
                    <Dropdown.Divider />
                    <form className='form-invite' onSubmit={this.sendInvite}>
                        <input id='emailInvite' className='email-in' type='email' placeholder='Email address' onChange={this.handleEmailInvite} required/>
                        <button className='btn btn-success' type='submit'>Send Invitation</button>
                    </form>
                    
                </DropdownButton>
            </React.Fragment>
        )
    }
}

export default withSnackbar(inviteFriend)
