import React from 'react'
import './tasklist.scss'
import Cookies from 'universal-cookie'
import { withRouter } from 'react-router-dom'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app'
import { configDev } from '../../firebase/auth'
import {RandomHash} from 'random-hash'

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

        const generateHash = new RandomHash();
        if (!firebase.app.length)
            firebase.initializeApp(configDev)


        this.state = {
            idHash: generateHash({length: 6}),
            List:['demo'],
            ListName: 'Things to do',
            content: 'This is content .........Testing content',
            taskContent:[
                'demo'
            ]
        }

        console.log(this.state)
    }


    onSubmitTask = (e) => {
        e.preventDefault()
        let ndname= this.state.content
        this.state.taskContent.push(ndname)
        this.forceUpdate()
    }

    onChangeInputTask = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleAddList = (e) => {
        e.preventDefault()
        let name = this.state.ListName
        this.state.List.push(name)
        this.forceUpdate()
    }

    handleChangeListName = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(e.target.id)
        console.log(e.target.value)
    }

    render() {
        return (
            <React.Fragment>
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
                                    
                                    return (
                                        
                                            <div key={index} value={value} className='list-container'>
                                                <div  className='list-wrap'>
                                                    <div className='list-name'>
                                                        {this.state.List}
                                                        <button className='btn-remove-list'>
                                                            <i className="far fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                    <div className='list-task-container'>
                                                    
                                                    {
                                                        this.state.taskContent.map((taskContent) => {
                                                            return(
                                                                <div key={taskContent} className='list-task'>{this.state.taskContent}</div>
                                                            )
                                                        })
                                                    }
                                                    </div>
                                                    <div className='btn-add-task'>
                                                        <form onSubmit={this.onSubmitTask}>
                                                            <input id='taskContent' className='add-task-input' type='text' placeholder='Input task title' onChange={this.onChangeInputTask} />
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
                                    <input id='listTitle' className='list-name-input' type='text' placeholder='Input list title ...' onChange={this.handleChangeListName} required/>
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
