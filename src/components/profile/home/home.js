import React from 'react'
import './home.scss'
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import balloon from '../../../assets/balloon2.png'
const useStyles = makeStyles({

    bigAvatar: {
        margin: 10,
        width: 100,
        height: 100,
        color: '#fff',
        backgroundColor: deepOrange[500]
    }
})

const AvatarIMG = () => {
    const classes = useStyles()
    let FN = localStorage.getItem('firstName'),
        LN = localStorage.getItem('lastName')

    let name = FN.slice(0, 1) + LN.slice(0, 1)

    return (
        <Avatar alt="Avatar" className={classes.bigAvatar}>{name}</Avatar>
    )
}

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.props.data
    }
    render() {
        return (
            <React.Fragment>
                <div className='home-zone'>
                    <div className='moving-banner'>
                        <div className='pos text'>
                            Let make your todo list <br />
                            with our application
                        </div>
                        <div className='pos cPink'></div>
                        <div className='pos cDark'></div>
                        <div className='pos cDarkCover'></div>
                        
                        <img alt='balloon' src={balloon} className='pos ball'></img>
                    </div>
                    <div className='title-zone'>
                        <h2 className='text-hz1'>Manage your personal information</h2>
                        <p className='text-hz2'>Control and change your information.</p>
                    </div>
                    <div className='info-zone'>
                        <h5>About</h5>
                        <div className='dropdown-divider' ></div>
                        <div className='form-zone'>

                            <form className='form-info'>

                                <div className='firstname'>
                                    <p className='dec-font'>First Name</p>
                                    <input type='text' defaultValue={this.state.firstName} className='dec' />
                                </div>
                                <div className='lastname'>
                                    <p className='dec-font'>Last Name</p>
                                    <input type='text' defaultValue={this.state.lastName} className='dec' />
                                </div>

                                <div className='userphone'>
                                    <p className='dec-font'>Phone Number</p>
                                    <input type='text' defaultValue={this.state.userPhone} className='dec ub' />
                                </div>
                                <div className='birthday'>
                                    <p className='dec-font'>Birthday</p>
                                    <input type='text' defaultValue={this.state.birthDay} className='dec ub' />
                                </div>

                                <button type='submit' className='btn btn-success' disabled>Save</button>
                            </form>

                            <div className='avatar-zone'>
                                <p className='dec-font'>Avatar</p>
                                <AvatarIMG />
                            </div>
                        </div>
                    </div>

                    <div className='contact-zone'>
                        <h5>Contact</h5>
                        <div className='dropdown-divider'></div>
                        <div className='email'>
                            <p className='dec-font'>Email address</p>
                            <div className='dec'> 
                                {this.state.dbEmail}
                                <div className='deco-pe'>
                                    <span className='pe'>Pirmary email</span>
                                    <span className='added'>Added {this.state.updatedAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Home
