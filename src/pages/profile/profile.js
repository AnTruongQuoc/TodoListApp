import React from 'react'
import './profile.scss'
import Cookies from 'universal-cookie'
import 'firebase/auth'
import 'firebase/firestore'
import firebase from 'firebase/app'
import { configDev } from '../../firebase/auth'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import AvatarBtn from '../../components/avatarBtn/avatarBtn'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Home from '../../components/profile/home/home'


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

    let name = FN.slice(0,1) + LN.slice(0,1) 

    return (
        <Avatar alt="Avatar" className={classes.bigAvatar}>{name}</Avatar>
    )
}


class profile extends React.Component {
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
            avatarURL: localStorage.getItem('avatarURL'),
            firstName: FN,
            lastName: LN,
            userPhone: localStorage.getItem('userPhone'),
            birthDay: localStorage.getItem('birthDay'),
            dbEmail: localStorage.getItem('email'),
            dbPassword: localStorage.getItem('password'),
            updatedAt: localStorage.getItem('updatedAt')
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className='profile'>
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
                            <AvatarBtn name={this.state.name} data={this.state} />
                        </div>
                    </div>
                    <div className='profile-body'>
                        <div className='profile-ava-container'>
                            <AvatarIMG />
                            <div className='text-contain'>
                                <p className='name'>{this.state.name}</p>
                                <p className='email'>{this.state.dbEmail}</p>
                            </div>
                        </div>
                        <div className='profile-tabs'>
                            <Tabs defaultActiveKey="home" id="noanim-tab-example">
                                <Tab eventKey="home" title="Profile">
                                    <Home data={this.state}/>
                                </Tab>
                                <Tab eventKey="profile" title="Setting" disabled>

                                </Tab>

                            </Tabs>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(profile)
