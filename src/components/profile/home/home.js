import React from 'react'
import './home.scss'
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import balloon from '../../../assets/balloon2.png'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import { server } from '../../../firebase/auth'
import { withSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

//Material-UI custom------------------------
const useStyles = makeStyles({

    bigAvatar: {
        margin: 10,
        width: 100,
        height: 100,
        color: '#fff',
        backgroundColor: deepOrange[500]
    },
    icon: {
        color: '#fff'
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
const CloseBtn = () => {
    const classes = useStyles()
    return (
        <CloseIcon className={classes.icon} style={{ fontSize: 20 }} />
    )
}
//------------------------------------------

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            info: [],
            avatarURL: this.props.data.avatarURL,
            birthDay: this.props.data.birthDay,
            dbEmail: this.props.data.dbEmail,
            dbPassword: this.props.data.dbPassword,
            firstName: this.props.data.firstName,
            lastName: this.props.data.lastName,
            name: null,
            showModal: false
        }
        this.state.info.push(this.props.data)
        console.log(this.state)
    }
    confirmChangeInfo = (e) => {
        e.preventDefault()

        console.log('Oke thay doi thong tin roi do')

        const tokenID = localStorage.getItem('tokenID')
        //Headers
        const headers = {
            'Content-Type': 'application/json',
            'tokenID': tokenID,
        }

        const path = server + '/api/user'
        axios.put(path, {
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'birthDay': this.state.birthDay
        }, { headers })
            .then((res) => {
                this.props.handle({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    birthDay: this.state.birthDay
                })
                console.log('helllo: ', res)
                localStorage.setItem('firstName', this.state.firstName)
                localStorage.setItem('lastName', this.state.lastName)
                localStorage.setItem('birthDay', this.state.birthDay)

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
                this.props.enqueueSnackbar('Your information have been updated.', {
                    variant: 'success',
                    action
                })

                this.forceUpdate()
            })
            .catch((err) => {

                const action = (key) => {
                    return (
                        <React.Fragment>
                            <IconButton onClick={() => { this.props.closeSnackbar(key) }}>
                                <CloseBtn />
                            </IconButton>
                        </React.Fragment>
                    )
                }
                this.props.enqueueSnackbar('Failed to update your information.', {
                    variant: 'error',
                    action
                })
            })
        this.setState({
            showModal: false
        })
    }
    closeModal = (e) => {
        e.preventDefault()
        this.setState({
            showModal: false
        })

    }

    handleSubmitInfo = (e) => {
        e.preventDefault()
        this.setState({
            showModal: true
        })

    }
    handleOnHide = () => {
        this.setState({
            showModal: false
        })
    }
    handleChangeInfo = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

        console.log('Kiem tra info: ', this.state)
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

                            <form className='form-info' onSubmit={this.handleSubmitInfo}>

                                <div className='firstname'>
                                    <p className='dec-font'>First Name</p>
                                    <input type='text' defaultValue={this.state.info[0].firstName} className='dec' id='firstName' onChange={this.handleChangeInfo} />
                                </div>
                                <div className='lastname'>
                                    <p className='dec-font'>Last Name</p>
                                    <input type='text' defaultValue={this.state.info[0].lastName} className='dec' id='lastName' onChange={this.handleChangeInfo} />
                                </div>

                                <div className='userphone'>
                                    <p className='dec-font'>Phone Number</p>
                                    <input type='text' defaultValue={this.state.info[0].userPhone} className='dec ub' id='userPhone' onChange={this.handleChangeInfo} disabled/>
                                </div>
                                <div className='birthday'>
                                    <p className='dec-font'>Birthday</p>
                                    <input type='text' defaultValue={this.state.info[0].birthDay} className='dec ub' id='birthDay' onChange={this.handleChangeInfo} />
                                </div>

                                <button type='submit' className='btn btn-success'>Save</button>
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
                                {this.state.info[0].dbEmail}
                                <div className='deco-pe'>
                                    <span className='pe'>Pirmary email</span>
                                    <span className='added'>Added {this.state.info[0].updatedAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    dialogClassName="modal-40w"
                    show={this.state.showModal}
                    onHide={this.handleOnHide}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>
                        <div className='modal-profile-home-info'>
                            <h4 className='title'>Update your information ?</h4>

                            <div className='form-btn-gr'>
                                <Button variant="danger" className='btn-close' onClick={this.closeModal}>
                                    <i className="fas fa-times"></i>
                                </Button>
                                <button type='submit' className='btn btn-success btn-submit' onClick={this.confirmChangeInfo}>
                                    <i className="fas fa-check"></i>
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>


            </React.Fragment>
        )
    }
}

export default withSnackbar(Home)
