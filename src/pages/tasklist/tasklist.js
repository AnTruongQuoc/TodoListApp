import React from 'react'
import './tasklist.scss'
import Cookies from 'universal-cookie'
import { withRouter, Redirect } from 'react-router-dom'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app'
import { configDev } from '../../firebase/auth'
import { RandomHash } from 'random-hash'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const SignOutBtn = withRouter(({ history }) => (true) ?
    <button className='btn-lgout' type='button' onClick={() => {

        const cookies = new Cookies()
        cookies.set('isLogin', false, { path: '/' })

        // firebase.auth().signOut().then(() => {
        //     console.log('Sign out Successful')
        // }).catch((error) => {
        //     console.log(error.message)
        // })

        history.push('/')

    }}>
        LOG OUT
        </button> : null
)

class TaskList extends React.Component {
    constructor(props) {
        super(props)


        if (!firebase.app.length)
            firebase.initializeApp(configDev)


        this.state = {
            showModal: false,
            taskInput: '',
            listID: '',
            listTitle: '',
            List: [],
            ListName: 'Done',
            taskContent: []
        }

        //console.log(this.state)
    }

    //Working with MODAL - React-Bootstrap
    handleClose = num => e => {
        e.preventDefault()

        let temp = this.state.List
        console.log(temp)
        temp[num.listPos].taskContents[num.taskPos].showDetail = false

        this.setState({
            List: temp
        })
    }

    //-=================================================================================-
    //-----------------------------------------FUNCTION----------------------------------
    //-=================================================================================-

    //Working with Task
    openTaskDetail = num => e => {
        e.preventDefault()
        let temp = this.state.List
        temp[num.listPos].taskContents[num.taskPos].showDetail = true
        this.setState({
            List: temp
        })
    }
    removeTask = num => e => {
        e.preventDefault()
        //console.log(num)
        this.state.List[num.listPos].taskContents.splice(num.taskPos, 1)
        this.forceUpdate()
    }
    onSubmitTask = value => e => {
        e.preventDefault()
        console.log(value)
        let ndname = {
            'content': this.state.taskInput,
            'showDetail': false
        }
        this.state.List[value].taskContents.push(ndname)
        //this.state.List[].taskContents.push(ndname)
        this.forceUpdate()
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
        const generateHash = new RandomHash();
        let idList = generateHash({ length: 6 })

        this.state.List.push({
            title: this.state.listTitle,
            taskContents: [],
            listID: idList
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
    //------------------------------------------RENDER ZONE-------------------------------
    render() {
        return (
            <React.Fragment>

                {this.checkLoginStatus()}
                <div className='task'>
                    <div className='nav-task'>
                        <div className='nav-board-c1'>
                            <button className='btn-home' type='button'>
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

                    <div className='nav-area'>
                        <div className='name-board'>Your Name Board</div>
                        <div className='task-list'>
                            {
                                this.state.List.map((index, value) => {
                                    const pos = value
                                    return (
                                        <div key={value + index} value={value} className='list-container'>
                                            <div className='list-wrap'>
                                                <div className='list-name'>
                                                    {this.state.List[pos].title}
                                                    <button className='btn-remove-list' onClick={this.removeList(pos)}>
                                                        <i className="far fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                                <div className='list-task-container'>
                                                    {
                                                        this.state.List[pos].taskContents.map((index, value) => {
                                                            const num = { 'listPos': pos, 'taskPos': value }
                                                            return (
                                                                <div key={value + index} className='list-task'>
                                                                    <div className='task-content' onClick={this.openTaskDetail(num)}> {this.state.List[pos].taskContents[value].content} </div>
                                                                    <button className='btn-remove-task' onClick={this.removeTask(num)}>
                                                                        <i className="fas fa-times"></i>
                                                                    </button>
                                                                    <Modal size='lg' show={this.state.List[pos].taskContents[value].showDetail} >
                                                                        <Modal.Header>
                                                                            <Modal.Title>
                                                                                <i className="fas fa-poll-h"></i>
                                                                                {this.state.List[pos].taskContents[value].content}
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



            </React.Fragment>
        )
    }
}

export default withRouter(TaskList)
