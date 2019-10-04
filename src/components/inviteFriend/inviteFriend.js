import React, { Component } from 'react'
import './inviteFriend.scss'
import {DropdownButton, Dropdown } from 'react-bootstrap'

export class inviteFriend extends Component {
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
                    <form className='form-invite'>
                        <input className='email-in' type='email' placeholder='Email address' required/>
                        <button className='btn btn-success' type='submit' disabled>Send Invitation</button>
                    </form>
                    
                </DropdownButton>
            </React.Fragment>
        )
    }
}

export default inviteFriend
