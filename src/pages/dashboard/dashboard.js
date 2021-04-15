import React from 'react'
import './dashboard.scss'
import { withRouter, Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app'
import { configDev } from '../../firebase/auth'
import { Modal, Alert, ButtonToolbar } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
//import { RandomHash } from 'random-hash'
import axios from 'axios'
import { server } from '../../firebase/auth'
import AvatarBtn from '../../components/avatarBtn/avatarBtn'
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../actions/actions'

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

class DashBoard extends React.Component {
    constructor(props) {
        super(props)


        if (!firebase.apps.length) {
            firebase.initializeApp(configDev);
        }


        //console.log(this.props)
        //this.taskRedirect = this.taskRedirect.bind(this)
        var str = localStorage.getItem('email')
        var n = str.indexOf('@')
        var name = str.substr(0, n)

        let FN = localStorage.getItem('firstName'),
            LN = localStorage.getItem('lastName')
        let fullname = FN + ' ' + LN

        this.state = {
            pos: 0,
            isUpdated: false,
            onHideModal: false,
            openModal: false,
            openModalRemove: false,
            openModalEdit: false,
            name: name,
            fullname: fullname,
            dbEmail: localStorage.getItem('email'),
            dbPassword: localStorage.getItem('password'),
            signOut: false,
            boardName: '',
            boardColor: '',
            boards: [],
            count: 0
        }


    }

    UNSAFE_componentWillMount() {
        this.updateState()
    }

    //Change COLOR BOARD----------------------------------
    applyColorBlue = (e) => {
        e.preventDefault()
        this.setState({
            boardColor: 'skyblue'
        })
    }
    applyColorYellow = (e) => {
        e.preventDefault()
        this.setState({
            boardColor: '#faf562'
        })
    }
    applyColorRed = (e) => {
        e.preventDefault()
        this.setState({
            boardColor: '#c93838'
        })
    }
    applyColorGreen = (e) => {
        e.preventDefault()
        this.setState({
            boardColor: '#01d28e'
        })
    }
    //-----------------------------------------------------
    //Change


    //Working with MODAL -----------------------------------------
    handleEditBoardInput = (e) => {
        this.setState({
            boardName: e.target.value
        })
    }
    handleSubmitEdit = (e) => {
        e.preventDefault()
        //this.state.boards.splice(this.state.pos, 1)

        const tokenID = localStorage.getItem('tokenID')
        const headers = {
            'Content-Type': 'application/json',
            'tokenID': tokenID,
        };
        const boardID = this.state.boards[this.state.pos].boardID
        const path = server + '/api/user/board/' + boardID
        axios.put(path, {
            'boardName': this.state.boardName
        }, { headers }).then((res) => {
            console.log('Changeeeeee:', res.data)

            let temp = this.state.boards
            temp[this.state.pos].boardName = res.data.boardName

            this.setState({
                boards: temp,
            })
            this.forceUpdate()
        })
            .catch((err) => {
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
                this.props.enqueueSnackbar('Failed To Edit This Board.', {
                    variant: 'error',
                    action
                })
            })

        this.setState({
            openModalEdit: false
        })
    }

    handleOnHideEdit = () => {
        this.setState({
            openModalEdit: false
        })
    }
    //--> Close Edit Popup MODAL
    closeModalEdit = (e) => {
        e.preventDefault()
        this.setState({
            openModalEdit: false
        })
    }
    //--> Open Edit Pop-up MODAL
    openModalEdit = index => (e) => {
        e.preventDefault()
        this.setState({
            openModalEdit: true,
            pos: index
        })
    }
    //-------------------------------------------------------------
    //--> Remove Board by Popup with MODAL
    onConfirmRemove = (e) => {
        e.preventDefault()
        //this.state.boards.splice(this.state.pos, 1)

        const tokenID = localStorage.getItem('tokenID')
        const headers = {
            'Content-Type': 'application/json',
            'tokenID': tokenID,
        };
        const boardID = this.state.boards[this.state.pos].boardID
        const boardName = this.state.boards[this.state.pos].boardName

        const path = server + '/api/user/board/' + boardID
        axios.delete(path, { headers }).then(() => {
            const action = (key) => {
                return (
                    <React.Fragment>
                        <IconButton onClick={() => { this.props.closeSnackbar(key) }}>
                            <CloseBtn />
                        </IconButton>
                    </React.Fragment>
                )
            }
            let mess = 'Deleted board ' + boardName
            this.props.enqueueSnackbar(mess, {
                variant: 'success',
                action
            })

            this.state.boards.splice(this.state.pos, 1)
            this.forceUpdate()
        }).catch((err) => {
            console.log('Error: ', err)
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
            this.props.enqueueSnackbar('Failed to delete board!', {
                variant: 'error',
                action
            })
        })

        this.setState({
            openModalRemove: false
        })
        this.forceUpdate()
    }
    handleInputName = (e) => {
        this.setState({
            boardName: e.target.value
        })
    }

    removeBoard = pos => e => {
        e.preventDefault()
        this.state.boards.splice(pos, 1)
        this.forceUpdate()
    }


    handleOnHideDelete = () => {
        this.setState({
            openModalRemove: false
        })
    }

    //--> Close Remove Popup MODAL
    closeModalRemove = (e) => {
        e.preventDefault()
        this.setState({
            openModalRemove: false
        })
    }

    //--> Open Remove Pop-up MODAL
    openModalRemove = index => (e) => {
        e.preventDefault()
        this.setState({
            openModalRemove: true,
            pos: index
        })
    }
    //----------------------------------------------------
    handleOpenModal = (e) => {
        e.preventDefault()
        this.setState({
            openModal: true
        })
    }

    handleCloseModal = (e) => {
        e.preventDefault()
        this.setState({
            openModal: false
        })
    }

    handleOnHideCreate = () => {
        this.setState({
            openModal: false
        })
    }


    //------CREATE BOARD-------
    onClick = (e) => {

        e.preventDefault()

        //create Board ID
        //const generateHash = new RandomHash();
        //let idBoard = generateHash({ length: 6 })

        //send token to Backend via HTTP
        const tokenID = localStorage.getItem('tokenID')

        const headers = {
            'Content-Type': 'application/json',
            'tokenID': tokenID,
        };

        const path = server + '/api/user/board'
        axios.post(path, {
            'boardName': this.state.boardName,
            'boardColor': this.state.boardColor,
            'status': ''
        },
            { headers })
            .then((res) => {
                this.state.boards.push({
                    boardName: this.state.boardName,
                    boardColor: this.state.boardColor,
                    status: '',
                    boardID: res.data.boardID
                })
                this.forceUpdate()

            })


        //console.log(this.state.boards)
        this.setState({
            openModal: false,
            boardColor: '#76dbd1',
            isUpdated: false
        })


    }

    taskRedirect() {
        console.log('Toggle toggle testing')
        // let path = '/dashboard/123/task'
        // this.props.history.push(path)

        //return <Redirect to='/dashboard/123/task'/>

    }

    gettingInfoUser() {
        const fbEmail = this.state.dbEmail
        const fbPassword = this.state.dbPassword
        firebase.auth().signInWithEmailAndPassword(fbEmail, fbPassword).then(() => {

        })
    }


    setLocal = pos => e => {
        localStorage.setItem('details', JSON.stringify(this.state.boards[pos].details))
    }

    updateState() {
        console.log('checking props: ', this.props)
        let a = this.state.isUpdated
        //console.log('.........:', a)
        if (a === false) {
            let self = this
            //send token to Backend via HTTP
            const idToken = localStorage.getItem('tokenID')
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'tokenID': idToken,
            };
            const path = server + '/api/user/boards'
            axios.get(path, { headers }).then(res => {

                console.log('Request Board', res.data)
                self.props.getAllBoard(res.data)
                self.setState({
                    boards: res.data,
                    isUpdated: true
                })
            }).catch((err) => {

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
                this.props.enqueueSnackbar('Failed to load boards.', {
                    variant: 'error',
                    action
                })
                console.log(err)
            })



        }


    }
    render() {
        return (
            <React.Fragment>
                {this.updateState()}
                <div className='boards'>
                    <div className='nav-board'>
                        <div className='nav-board-c1'>
                            <Link to='/dashboard'>
                                <button className='btn-home' type='button'>
                                    <i className="fas fa-home fa-2x" />
                                </button>
                            </Link>

                        </div>
                        <div className='nav-board-c2'>
                            <div className='nav-board-title'>
                                <h5 className='nav-h5-btitle'>TodoListApp</h5>
                            </div>
                        </div>
                        <div className='nav-board-c3'>
                            <AvatarBtn name={this.state.fullname} data={this.state} />
                        </div>
                    </div>
                    <div className='body-board'>
                        <p className='wel-title'>Welcome, <b>
                            {
                                this.state.name
                            }
                        </b>  !</p>

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
                                    {
                                        this.props.boards.map((value, index) => {

                                            const id = this.props.boards[index].boardID
                                            const name = this.props.boards[index].boardName
                                            const path = '/b/' + index + '/' + id + '/' + name

                                            //console.log(path)
                                            //console.log('value:', value)
                                            // const style = {
                                            //     backgroundColor: this.props.boards[index].boardColor
                                            // }

                                            //console.log('Background: ', style)
                                            return (
                                                <li key={index}  className={'boards-detail-section-list'} >

                                                    <Link to={path} className='text-contain' value={this.props.boards} onClick={this.setLocal(index)}>
                                                        <h5> {value.boardName}</h5>
                                                    </Link>

                                                    <div className='btn-board-area'>
                                                        <button className='btn-edit-board' onClick={this.openModalEdit(index)}>
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>
                                                        <button className='btn-remove-board' onClick={this.openModalRemove(index)}>
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                    <li className='boards-detail-section-list'>
                                        <div className='btn-create-boards'>
                                            <button className='btn-cboard' type='button' onClick={this.handleOpenModal}>
                                                Create New Board
                                            </button>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                        </div>

                    </div>
                </div>

                <Modal show={this.state.openModal} onHide={this.handleOnHideCreate}>
                    <Modal.Header>
                        <Modal.Title className='create-board'>
                            Create New Board
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='cover-name-input'>
                            <input className='nameboard-input' type='text' placeholder='Your Name Board' onChange={this.handleInputName} required></input>
                        </div>
                        <div className='color-choose'>
                            <button className='blue' onClick={this.applyColorBlue}></button>
                            <button className='green' onClick={this.applyColorGreen}></button>
                            <button className='yellow' onClick={this.applyColorYellow}></button>
                            <button className='red' onClick={this.applyColorRed}></button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                        <ButtonToolbar>
                            <Button variant="primary" onClick={this.onClick}> Create </Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.openModalRemove} onHide={this.handleOnHideDelete}>
                    <Modal.Header>
                        <Modal.Title className='delete-board'>
                            <i className="fas fa-exclamation-triangle"></i>
                            Are you sure ?
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert key='danger' variant='danger'>
                            <i>Be careful! This board will be deleted permanently.</i>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModalRemove}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={this.onConfirmRemove}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.openModalEdit} onHide={this.handleOnHideEdit}>
                    <Modal.Header>
                        <Modal.Title className='edit-board'>
                            <i className="far fa-edit"></i>
                            Edit Board Name
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className='form-edit-b' onSubmit={this.handleSubmitEdit}>
                            <input className='in-edit-b' type='text' placeholder="New Board's Name" onChange={this.handleEditBoardInput} required />
                            <div className='form-btn-gr'>
                                <Button className='btn-close' variant="danger" onClick={this.closeModalEdit}>
                                    <i className="fas fa-times"></i>
                                </Button>
                                <button className='btn btn-success btn-submit' type='submit'>
                                    <i className="fas fa-check"></i>
                                </button>
                            </div>
                        </form>
                    </Modal.Body>

                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.boards,
        login: state.login
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getAllBoard : (boardsData) => {
            dispatch(actions.getAll(boardsData))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withRouter(DashBoard)))
