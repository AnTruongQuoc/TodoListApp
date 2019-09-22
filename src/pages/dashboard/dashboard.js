import React from 'react'
import './dashboard.scss'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app'
import { configDev } from '../../firebase/auth'
import { Modal, Alert } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { RandomHash } from 'random-hash'

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


        //console.log(this.props)
        this.taskRedirect = this.taskRedirect.bind(this)

        this.state = {
            pos: 0,
            onHideModal: false,
            openModal: false,
            openModalRemove: false,
            dbEmail: 'loi@gmail.com',
            dbPassword: 'qweqwe',
            signOut: false,
            boardName: '',
            boardColor: '',
            boards: [],
            count: 0
        }
        console.log(this.state)

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

    //--> Remove Board by Popup with MODAL
    onConfirmRemove = (e) => {
        e.preventDefault()
        this.state.boards.splice(this.state.pos, 1)
        this.setState({
            openModalRemove: false
        })
        this.forceUpdate()
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
    onClick = (e) => {

        e.preventDefault()

        //create Board ID
        const generateHash = new RandomHash();
        let idBoard = generateHash({ length: 6 })

        this.state.boards.push({
            boardID: idBoard,
            boardName: this.state.boardName,
            boardColor: this.state.boardColor
        })
        this.forceUpdate()

        console.log(this.state.boards)
        this.setState({
            openModal: false,
            boardColor: '#76dbd1'
        })

    }

    taskRedirect() {
        console.log('Toggle toggle testing')
        let path = '/task'
        this.props.history.push(path)
    }

    gettingInfoUser() {
        const fbEmail = this.state.dbEmail
        const fbPassword = this.state.dbPassword
        firebase.auth().signInWithEmailAndPassword(fbEmail, fbPassword).then(() => {

        })
    }

    checking() {
        //e.preventDefault()
        //console.log(this.props.location)
        //console.log(this.state)
        let test = localStorage.getItem('password')
        console.log('LocalStorage test: ', test)
        console.log(this.props)
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
                        <p className='wel-title'>Welcome, <b>{this.state.dbEmail} </b>  !</p>

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
                                            //console.log('index: ', index)
                                            //console.log('value:', value)
                                            const style = {
                                                background: this.state.boards[index].boardColor
                                            }
                                            return (
                                                <li key={index} style={style} className={'boards-detail-section-list'} >

                                                    <div className='text-contain' onClick={this.taskRedirect}>
                                                       <h5> {value.boardName}</h5>
                                                        
                                                    </div>


                                                    <button className='btn-remove-board' onClick={this.openModalRemove(index)}>
                                                        <i className="fas fa-times"></i>
                                                    </button>

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
                        <Button variant="primary" onClick={this.onClick}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.openModalRemove} >
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
            </React.Fragment>
        )
    }
}

export default withRouter(DashBoard)
