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
import { server } from '../../firebase/auth'
import AvatarBtn from '../../components/avatarBtn/avatarBtn'
import InviteFriend from '../../components/inviteFriend/inviteFriend'
import AvatarMember from '../../components/memberAvatar/memberAvatar'

class TaskList extends React.Component {
    constructor(props) {
        super(props)


        if (!firebase.apps.length) {
            firebase.initializeApp(configDev);
        }

        let FN = localStorage.getItem('firstName'),
            LN = localStorage.getItem('lastName')
        let fullname = FN + ' ' + LN

        this.state = {
            name: fullname,
            dbEmail: localStorage.getItem('email'),
            dbPassword: localStorage.getItem('password'),
            isUpdated: false,
            numTask: {},
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password'),
            showModal: false,
            sModalEdit: false,
            sModalEditTask: false,
            taskInput: '',
            editInput: '',
            editStatusIn: '',
            editTaskIn: '',
            listID: '',
            listTitle: '',
            List: [],
            statusList: [],
            TList: [],
            details: [],
            ListName: 'Done',
            boardName: 'Default',
            description: '',
            taskContent: [],
            isMounted: false
        }

        console.log(this.props)
    }

    componentDidMount() {
        this.loadBoardFirst()
    }

    handleDescription = (e) => {
        e.preventDefault()

        this.setState({
            description: e.target.value
        })
    }

    submitDescription = num => e => {
        e.preventDefault()

        console.log('Nummmmmmmmm:', num)
        const tokenID = localStorage.getItem('tokenID')

        const headers = {
            'Content-Type': 'application/json',
            'tokenID': tokenID,
        };

        const boardID = this.props.match.params.id
        const taskID = this.state.List[num.listPos].taskContent[num.taskPos].id
        console.log('Task ID: ', taskID)

        const path = server + '/api/user/board/' + boardID + '/task/' + taskID
        axios.put(path, {
            'description': this.state.description
        }, { headers }).then((res) => {
            console.log(res.data)
            // let temp = this.state.List
            // temp[num.listPos].taskContent[num.taskPos].description = res.data.description
            // console.log('temp desciption:', temp[num.listPos].taskContent[num.taskPos].taskName)

            this.setState({
                //List: temp,
                isUpdated: false
            })

            //this.forceUpdate()
        })
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

    handleInputEdit = (e) => {
        this.setState({
            editInput: e.target.value
        })
    }

    submitEditName = (e) => {

        e.preventDefault()
        //Get TokenID by localStorage
        const tokenID = localStorage.getItem('tokenID')
        //Headers
        const headers = {
            'Content-Type': 'application/json',
            'tokenID': tokenID,
        };

        const boardID = this.props.match.params.id
        const pathEdit = server + '/api/user/board/' + boardID
        axios.put(pathEdit, {
            'boardName': this.state.editInput
        }, { headers }).then((res) => {
            console.log(res.data)
            const link = '/b/' + this.props.match.params.pos + '/' + this.props.match.params.id + '/' + res.data.boardName
            this.props.history.push(link)
        }).catch((err) => console.log(err))

        this.setState({
            sModalEdit: false,
            isUpdated: false
        })
        this.forceUpdate()
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

    openModalEditTask = num => (e) => {
        e.preventDefault()

        let temp = this.state.List
        temp[num.listPos].taskContent[num.taskPos].showEdit = true

        this.setState({
            List: temp,
            numTask: num
        })
    }

    closeModalEditTask = num => e => {
        e.preventDefault()

        let temp = this.state.List
        temp[num.listPos].taskContent[num.taskPos].showEdit = false

        this.setState({
            List: temp
        })
    }
    handleInputEditStatus = (e) => {
        this.setState({
            editStatusIn: e.target.value
        })
    }
    handleInputEditTask = (e) => {
        //console.log(e.target.value)
        this.setState({
            editTaskIn: e.target.value
        })
    }
    submitEditTaskName = num => e => {
        e.preventDefault()
        //console.log(num)
        console.log('Nummmmmmmmm:', num)

        const tokenID = localStorage.getItem('tokenID')

        const headers = {
            'Content-Type': 'application/json',
            'tokenID': tokenID,
        };

        let exist = false
        let editStatus = ''
        let taskID = this.state.List[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].id

        console.log('Editttinnnngggg stattus:', this.state.editStatusIn)

        if (this.state.editStatusIn === '')
        {
            editStatus = this.state.List[this.state.numTask.listPos].status

            let temp = this.state.List
                
                temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].content = this.state.editTaskIn
                temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].showEdit = false
                console.log('temp taskname:', temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].content)
                
                console.log('Dieu kien 1')
                //editStatus = temp[this.state.numTask.listPos].status
                this.setState({
                    List: temp,
                    editStatusIn: ''
                    //isUpdated: false
                })
                this.forceUpdate()
            
        }
        else {
            if (this.state.editStatusIn === this.state.List[num.listPos].status){
                console.log('Checkstatus:', true)
                let temp = this.state.List
                
                temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].content = this.state.editTaskIn
                temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].showEdit = false
                console.log('temp taskname:', temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].content)
                
                editStatus = temp[this.state.numTask.listPos].status
                this.setState({
                    List: temp,
                    isUpdated: false
                })
                console.log('Dieu kien else 1', this.state.List)
                this.forceUpdate()
            }
            else {
                console.log('Checkstatus: ', false)
                let temp = this.state.List
                temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].status = this.state.editStatusIn
                temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].showEdit = false
                temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].content = this.state.editTaskIn
                
                console.log('aaaaa', temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].content)
                //Make a copy
                let c = temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos]

                taskID = temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].id

                for (var i = 0; i < temp.length; i++){
                    if (this.state.editStatusIn === temp[i].status){
                        temp[i].taskContent.push(c)
    
                        temp[this.state.numTask.listPos].taskContent.splice(this.state.numTask.taskPos, 1)
                        editStatus = temp[i].status
                             
                        exist = true
                    }
                }
                console.log('tempppppp:' , temp)
                console.log('Dieu kien else 2')
    
                if (exist === false){
                    this.state.List.push({
                        status: this.state.editStatusIn,
                        taskContent: []
                    })
                    editStatus = this.state.editStatusIn

                    const pos = this.state.List.length - 1

                    this.state.List[pos].taskContent.push(c)

                    

                    this.state.List[this.state.numTask.listPos].taskContent.splice(this.state.numTask.taskPos, 1)
                    
                    const posTask = this.state.List[pos].taskContent.length - 1

                    editStatus = this.state.List[pos].taskContent[posTask].status
                    console.log('Dieu kien else 3', this.state.List)
                    this.forceUpdate()
                }
                else {
                    console.log('tempppp 4:', temp)
                    this.setState({
                        List: temp,
                        //isUpdated: false
                    })
                    
                    this.forceUpdate()
                    console.log('Dieu kien else 4', this.state.List)
                }
            }
        }

        const boardID = this.props.match.params.id
        //const taskID = this.state.List[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].id
        console.log('Task ID: ', taskID)
        console.log('Statusssss: ', editStatus)

        const path = server + '/api/user/board/' + boardID + '/task/' + taskID
        axios.put(path, {
            'taskName': this.state.editTaskIn,
            'status': editStatus
        }, { headers }).then((res) => {
            console.log(res.data)
            // let temp = this.state.List
            // temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].taskName = res.data.taskName
            // console.log('temp taskname:', temp[this.state.numTask.listPos].taskContent[this.state.numTask.taskPos].taskName)

            this.setState({
                editStatusIn: ''
            })

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
                'id': res.data.taskID,
                'status': res.data.status
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

    loadBoardFirst() {
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
        }).catch((err) => { console.log(err) })
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

            let de = []

            //Axios get board by boardID from Database
            const pathBoard = server + '/api/user/boards'
            axios.get(pathBoard, { headers }).then((res) => {
                // this.setState({
                //     details: res.data[this.props.match.params.pos].details
                // })
                const detailsT = res.data[this.props.match.params.pos].details
                
                de =  res.data[this.props.match.params.pos].details
                localStorage.setItem('details', JSON.stringify(detailsT))

                console.log('detailssssssssssssss: ', this.state.details)
                //const details = JSON.parse(localStorage.getItem('details'))

                const boardID = this.props.match.params.id
                //Axios get task List from Database
                const pathTask = server + '/api/user/board/' + boardID + '/tasks'

                axios.get(pathTask, { headers }).then(res => {
                    console.log('testinggggg: ', localStorage.getItem('details'))
                    console.log('Checking storeeee:', localStorage.details === undefined)
                    let details = []
                    if (localStorage.getItem('details') === 'undefined'){
                        details = de
                    }
                    else {
                        details = JSON.parse(localStorage.getItem('details'))
                    }
                    console.log('DETAILSSSS: ', details)
                        //const details = this.state.details
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
                                    status: res.data[i].status,
                                    showDetail: false,
                                    showEdit: false,
                                    id: res.data[i].taskID,
                                    description: res.data[i].description
                                })
                            }
                        }
                    }

                    console.log('hello testing', this.state.List)

                    this.setState({
                        List: statusList,
                        isUpdated: true
                    })
                    this.forceUpdate()
                    console.log('Request Task in Board', res.data)

                })
            }).catch((err) => { console.log(err) })
        }
    }

    onDrop = (e) => {
        e.preventDefault();
        console.log('eventtttttt:'  ,e)
        var data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));
    }

    allowDrop = (e) => {
        e.preventDefault()
    }

    handleDrap = (e) => {
        
        e.dataTransfer.setData('text', e.target.id)
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
                            
                            <AvatarBtn name={this.state.name} data={this.state}/>
                        </div>

                    </div>

                    <div className='nav-area'>
                        <div className='name-board'>
                            {this.props.match.params.name}
                            <button type='button' className='btn-edit-title' onClick={this.openEditModal} disabled>
                                <i className="far fa-star"></i>
                            </button>
                            <AvatarMember/>
                            <InviteFriend boardID={this.props.match.params.id}/>
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
                                                <div className='list-task-container' onDrop={this.onDrop} onDragOver={this.allowDrop}>
                                                    {
                                                        this.state.List[pos].taskContent.map((index, value) => {
                                                            const num = { 'listPos': pos, 'taskPos': value }
                                                            return (
                                                                <div key={value + index} id='data' className='list-task' draggable="true" onDragStart={this.handleDrag}>
                                                                    <div className='task-content' onClick={this.openTaskDetail(num)}> {this.state.List[pos].taskContent[value].content} </div>

                                                                    <button className='btn-change-task' onClick={this.openModalEditTask(num)}>
                                                                        <i className="fas fa-edit"></i>
                                                                    </button>

                                                                    <Modal show={this.state.List[pos].taskContent[value].showEdit} onHide={this.handleOnHideEditTask}>
                                                                        <Modal.Header>
                                                                            <Modal.Title className='edit-board-name'>
                                                                                <i className="far fa-edit"></i>
                                                                                Edit Your Task Name
                                                                            </Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>

                                                                            <form onSubmit={this.submitEditTaskName(num)} className='form-edit-task'>
                                                                                <input type='text' className='in-edit-t' placeholder='New Task Name' onChange={this.handleInputEditTask} required />
                                                                                <div className='edit-status-area'>
                                                                                   <h5>Status:</h5>
                                                                                    <textarea type='text' rows='1' className='in-edit-t' onChange={this.handleInputEditStatus}>
                                                                                        {this.state.List[pos].taskContent[value].status}
                                                                                    </textarea>
                                                                                </div>
                                                                                <div className='form-btn-gr'>
                                                                                    <Button variant="danger" className='btn-close' onClick={this.closeModalEditTask(num)}>
                                                                                        <i className="fas fa-times"></i>
                                                                                    </Button>
                                                                                    <button type='submit' className='btn btn-success btn-submit'>
                                                                                        <i className="fas fa-check"></i>
                                                                                    </button>
                                                                                </div>


                                                                            </form>
                                                                        </Modal.Body>

                                                                    </Modal>

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



                                                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                                                <Form.Label>
                                                                                    <i className="fas fa-align-justify"></i>
                                                                                    Description
                                                                                </Form.Label>

                                                                                <form onSubmit={this.submitDescription(num)} className='form-edit-des'>
                                                                                    <textarea row='3' onChange={this.handleDescription} defaultValue={this.state.List[pos].taskContent[value].description}></textarea>
                                                                                    <input type='submit' value='Edit Description' className='btn btn-success btn-edit-des' />
                                                                                </form>
                                                                            </Form.Group>
                                                                            <Alert key='danger' variant='danger'>
                                                                                <b>Sorry! This part we haven't initialized it yet ! Coming Soon...</b>
                                                                            </Alert>
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
                                                                            <Button variant="primary" onClick={this.handleClose(num)} disabled>
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

                        <form onSubmit={this.submitEditName}>
                            <input type='text' placeholder='Board Name' onChange={this.handleInputEdit} required />
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
