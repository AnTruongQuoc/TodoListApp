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

const SignOutBtn = withRouter(({ history }) => (true) ?
    <button className='btn-lgout' type='button' onClick={() => {

        const cookies = new Cookies()
        cookies.set('isLogin', false, { path: '/' })
        const email = localStorage.getItem('email'),
            pass = localStorage.getItem('password')

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


        //console.log(this.props)
        //this.taskRedirect = this.taskRedirect.bind(this)
        var str = localStorage.getItem('email')
        var n = str.indexOf('@')
        var name = str.substr(0, n)

        this.state = {
            pos: 0,
            isUpdated: false,
            onHideModal: false,
            openModal: false,
            openModalRemove: false,
            openModalEdit: false,
            name: name,
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

    //Change COLOR BOARD
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

    //Change
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

    //Working with MODAL 

    onConfirmEdit = (e) => {
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
            'boardName': 'newname'
        } ,{ headers }).then((res) => {
            console.log('Changeeeeee:', res.data)

            let temp = this.state.boards
            temp[this.state.pos].boardName = res.data.boardName
            
            this.setState({
                boards: temp,
                openModalEdit: false
            })
            this.forceUpdate()
        })

       
        
    }

    handleOnHideEdit = () => {
        this.setState({
            openModalEdit: false
        })
    }

    //--> Close Remove Popup MODAL
    closeModalEdit = (e) => {
        e.preventDefault()
        this.setState({
            openModalEdit: false
        })
    }

    //--> Open Remove Pop-up MODAL
    openModalEdit = index => (e) => {
        e.preventDefault()
        this.setState({
            openModalEdit: true,
            pos: index
        })
    }

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
        const path = server + '/api/user/board/' + boardID
        axios.delete(path, { headers }).then(() => {
            this.state.boards.splice(this.state.pos, 1)
            this.forceUpdate()
        })

        this.setState({
            openModalRemove: false
        })
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
        //const tokenID = localStorage.getItem('tokenID')
        //const cookies = new Cookies()
        //const tokenID = cookies.get('tokenID')

        let a = this.state.isUpdated
        //console.log('.........:', a)
        if (a === false) {
            let self = this
            //send token to Backend via HTTP
            firebase.auth().signInWithEmailAndPassword(this.state.dbEmail, this.state.dbPassword).then(() => {
                firebase.auth().currentUser.getIdToken(true).then((idToken) => {
                    const headers = {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'tokenID': idToken,
                    };
                    //console.log('DUMAAAAAA: ', headers)

                    const path = server + '/api/user/boards'
                    axios.get(path, { headers }).then(res => {

                        console.log('Request Board', res.data)

                        self.setState({
                            boards: res.data,
                            isUpdated: true
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                })
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
                            <SignOutBtn />
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
                                        this.state.boards.map((value, index) => {

                                            const id = this.state.boards[index].boardID
                                            const name = this.state.boards[index].boardName
                                            const path = '/b/' + index + '/' + id + '/' + name

                                            //console.log(path)
                                            //console.log('value:', value)
                                            const style = {
                                                backgroundColor: this.state.boards[index].boardColor
                                            }

                                            //console.log('Background: ', style)
                                            return (
                                                <li key={index} style={style} className={'boards-detail-section-list'} >

                                                    <Link to={path} className='text-contain' value={this.state.boards} onClick={this.setLocal(index)}>
                                                        <h5> {value.boardName}</h5>
                                                    </Link>


                                                    <div className='btn-board-area'>
                                                        <button className='btn-edit-board' onClick={this.openModalEdit(index)}>
                                                            <i class="fas fa-pencil-alt"></i>
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
                        <Button variant="secondary" onClick={this.closeModalEdit}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={this.onConfirmEdit}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

export default withRouter(DashBoard)
