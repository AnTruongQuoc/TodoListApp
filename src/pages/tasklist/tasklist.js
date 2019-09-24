import React from 'react'
import './tasklist.scss'
import Cookies from 'universal-cookie'
import { withRouter, Redirect, Link } from 'react-router-dom'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app'
import { configDev } from '../../firebase/auth'
//import { RandomHash } from 'random-hash'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import {server} from '../../firebase/auth'

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
                // firebase.auth().currentUser.getIdToken(true).then((idToken) => {
                //     console.log('tokennnnn: ', idToken)
                // }).catch((err) => {
                //     console.log('ko lay duoc token')
                // })
                // firebase.auth().onAuthStateChanged((user) => {
                //     if (user){console.log('state change: ', user.email)}
                //     else {
                //         console.log('State change: LOG OUT')

                //     }
                // })
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

class TaskList extends React.Component {
    constructor(props) {
        super(props)


        if (!firebase.apps.length) {
            firebase.initializeApp(configDev);
        }


        this.state = {
            isUpdated: false,
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password'),
            showModal: false,
            sModalEdit: false,
            taskInput: '',
            listID: '',
            listTitle: '',
            List: [],
            TList: [],
            ListName: 'Done',
            taskContent: []
        }

        console.log(this.props)
    }

    //Working with MODAL - React-Bootstrap
    handleClose = num => e => {
        e.preventDefault()

        let temp = this.state.List
        console.log(temp)
        temp[num.listPos].taskContent[num.taskPos].showDetail = false

        this.setState({
            List: temp
        })
    }

    //-=================================================================================-
    //-----------------------------------------FUNCTION----------------------------------
    //-=================================================================================-

    //Editing Title Modal
    openEditModal = (e) => {
        e.preventDefault()
        this.setState({
            sModalEdit: true
        })
    }

    closeModalEdit = (e) => {
        e.preventDefault()
        this.setState({
            sModalEdit: false
        })
    }

    //Working with Task
    openTaskDetail = num => e => {
        e.preventDefault()
        let temp = this.state.List
        temp[num.listPos].taskContent[num.taskPos].showDetail = true
        this.setState({
            List: temp
        })
    }
    removeTask = num => e => {
        e.preventDefault()
        //console.log(num)


        const tokenID = localStorage.getItem('tokenID')

        const headers = {
            'Content-Type': 'application/json',
            'tokenID': tokenID,
        };


        const boardID = this.props.match.params.id
        const taskID = this.state.List[num.listPos].taskContent[num.taskPos].id

        const path = server + '/api/user/board/' + boardID + '/task/' + taskID
        axios.delete(path, { headers }).then(() => {
            this.state.List[num.listPos].taskContent.splice(num.taskPos, 1)
            this.forceUpdate()
        })
    }
    onSubmitTask = value => e => {
        e.preventDefault()
        console.log(value)

        //this.state.List[].taskContents.push(ndname)



        //send token to Backend via HTTP
        const tokenID = localStorage.getItem('tokenID')

        const headers = {
            'Content-Type': 'application/json',
            'tokenID': tokenID,
        };
        const boardID = this.props.match.params.id
        const path = server + '/api/user/board/' + boardID + '/task'

        axios.post(path, {
            'status': this.state.List[value].status,
            'taskName': this.state.taskInput
        }, { headers }).then((res) => {
            let ndname = {
                'content': this.state.taskInput,
                'showDetail': false,
                'id': res.data.taskID
            }
            this.state.List[value].taskContent.push(ndname)
            this.forceUpdate()
        })

        this.setState({
            isUpdated: true
        })

        document.getElementById('taskInputContent-' + value).value = ''

        console.log(this.state.List)
    }
    onChangeInputTask = (e) => {
        let check = e.target.value
        this.setState({
            taskInput: check
        })
        //this.forceUpdate()
    }


    //Working with List
    removeList = value => e => {
        e.preventDefault()
        this.state.List.splice(value, 1)
        this.forceUpdate()
    }

    handleAddList = (e) => {
        e.preventDefault()

        //create List ID
        //const generateHash = new RandomHash();
        //let idList = generateHash({ length: 6 })

        this.state.List.push({
            status: this.state.listTitle,
            taskContent: [],
        })
        this.setState({
            isUpdated: true
        })
        this.forceUpdate()

        document.getElementById('addListTitle').value = ''
        //console.log(this.state.List)
    }

    handleChangeListName = (e) => {
        let listTitle = e.target.value

        this.setState({
            listTitle: listTitle
        })
    }


    checkLoginStatus() {
        const cookies = new Cookies()
        let check = cookies.get('isLogin')
        if (check === 'false')
            return <Redirect to='/login' />
    }

    updateTask() {
        let a = this.state.isUpdated
        console.log('.........:', a)

        if (a === false) {
            
            //Get TokenID by localStorage
            const tokenID = localStorage.getItem('tokenID')


            //Headers
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'tokenID': tokenID,
            };

            //Axios get board by boardID from Database
            const pathBoard = server + '/api/user/boards'
            axios.get(pathBoard, { headers }).then((res) => {
                const detailsT = res.data[this.props.match.params.pos].details
                localStorage.setItem('details', JSON.stringify(detailsT))
            }).catch((err) => {console.log(err)})

            const boardID = this.props.match.params.id


            //Axios get task List from Database
            const pathTask = server + '/api/user/board/' + boardID + '/tasks'
            axios.get(pathTask, { headers }).then(res => {

                const details = JSON.parse(localStorage.getItem('details'))
                const statusList = []

                for (var i = 0; i < details.length; i++) {
                    statusList.push({
                        status: details[i].status,
                        taskContent: []
                    })
                }

                for (i = 0; i < res.data.length; i++) {
                    for (var j = 0; j < statusList.length; j++) {
                        if (statusList[j].status === res.data[i].status) {
                            statusList[j].taskContent.push({
                                content: res.data[i].taskName,
                                showDetail: false,
                                id: res.data[i].taskID
                            })
                        }
                    }
                }

                console.log('hello testing', statusList)

                this.setState({
                    List: statusList,
                    isUpdated: true
                })
                console.log('Request Task in Board', res.data)

            })
        }



    }
    //------------------------------------------RENDER ZONE-------------------------------
    render() {
        return (
            <React.Fragment>

                {this.checkLoginStatus()}
                {this.updateTask()}
                <div className='task'>
                    <div className='nav-task'>
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

                    <div className='nav-area'>
                        <div className='name-board'>
                            {this.props.match.params.name}
                            <button type='button' className='btn-edit-title' onClick={this.openEditModal}>
                                <i className="fas fa-pencil-alt"></i>
                            </button>
                        </div>
                        <div className='task-list'>
                            {
                                this.state.List.map((index, value) => {
                                    const pos = value
                                    return (
                                        <div key={value + index} value={value} className='list-container'>
                                            <div className='list-wrap'>
                                                <div className='list-name'>
                                                    {this.state.List[pos].status}
                                                    <button className='btn-remove-list' onClick={this.removeList(pos)}>
                                                        <i className="far fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                                <div className='list-task-container'>
                                                    {
                                                        this.state.List[pos].taskContent.map((index, value) => {
                                                            const num = { 'listPos': pos, 'taskPos': value }
                                                            return (
                                                                <div key={value + index} className='list-task'>
                                                                    <div className='task-content' onClick={this.openTaskDetail(num)}> {this.state.List[pos].taskContent[value].content} </div>
                                                                    <button className='btn-remove-task' onClick={this.removeTask(num)}>
                                                                        <i className="fas fa-times"></i>
                                                                    </button>
                                                                    <Modal size='lg' show={this.state.List[pos].taskContent[value].showDetail} >
                                                                        <Modal.Header>
                                                                            <Modal.Title>
                                                                                <i className="fas fa-poll-h"></i>
                                                                                {this.state.List[pos].taskContent[value].content}
                                                                            </Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>

                                                                            <Alert key='danger' variant='danger'>
                                                                                <b>Sorry! This part we haven't initialized it yet ! Coming Soon...</b>
                                                                            </Alert>
                                                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                                                <Form.Label>
                                                                                    <i className="fas fa-align-justify"></i>
                                                                                    Description
                                                                                </Form.Label>
                                                                                <Form.Control as="textarea" rows="3" />
                                                                            </Form.Group>

                                                                            <Form.Group controlId="exampleForm.ControlTextarea2">
                                                                                <Form.Label>
                                                                                    <i className="fas fa-check"></i>
                                                                                    Checklist
                                                                                </Form.Label>
                                                                                <ProgressBar animated now={45} label='45%' />

                                                                                <Form.Check
                                                                                    custom
                                                                                    inline
                                                                                    label="This is just a demo Checklist, not initialize yet so don't touch it"
                                                                                    type='checkbox'
                                                                                    id='custom-inline-c2'
                                                                                />
                                                                                <Form.Check
                                                                                    custom
                                                                                    inline
                                                                                    label="This is just a demo Checklist, not initialize yet so don't touch it"
                                                                                    type='checkbox'
                                                                                    id='custom-inline-c3'
                                                                                />
                                                                                <Form.Check
                                                                                    custom
                                                                                    inline
                                                                                    label="This is just a demo Checklist, not initialize yet so don't touch it"
                                                                                    type='checkbox'
                                                                                    id='custom-inline-c4'
                                                                                />
                                                                            </Form.Group>

                                                                        </Modal.Body>
                                                                        <Modal.Footer>
                                                                            <Button variant="secondary" onClick={this.handleClose(num)}>
                                                                                Close
                                                                        </Button>
                                                                            <Button variant="primary" onClick={this.handleClose(num)}>
                                                                                Save Changes
                                                                        </Button>
                                                                        </Modal.Footer>
                                                                    </Modal>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className='btn-add-task'>
                                                    <form onSubmit={this.onSubmitTask(value)}>
                                                        <input id={'taskInputContent-' + value} className='add-task-input' type='text' placeholder='Input task title' onChange={this.onChangeInputTask} required />
                                                        <input className='task-input-submit' type='submit' value='ADD' />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }

                            <div className='add-list'>
                                <form onSubmit={this.handleAddList} className='form-add-list'>
                                    <input id='addListTitle' className='list-name-input' type='text' placeholder='Input list title ...' onChange={this.handleChangeListName} required />
                                    <input id='ListName' className='list-submit' type='submit' value='ADD' />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.sModalEdit} onHide={this.handleOnHideEdit}>
                    <Modal.Header>
                        <Modal.Title className='edit-board-name'>
                            <i className="far fa-edit"></i>
                            Edit Your Board Name
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                        <form>
                            <input type='text' placeholder='Board Name'></input>
                            <Button variant="secondary" onClick={this.closeModalEdit}>
                                Close
                            </Button>
                            <input type='submit' value='Edit' className='btn btn-primary'></input>
                        
                        </form>
                        
                        
                    </Modal.Body>
                   
                </Modal>

            </React.Fragment>
        )
    }
}

export default withRouter(TaskList)
