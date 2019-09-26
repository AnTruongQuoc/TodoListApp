import React from 'react'
//import Container from 'react-bootstrap/Container'
//import Col from 'react-bootstrap/Col'
//import Row from 'react-bootstrap/Row'
import './homepage.scss'
import hpimage from '../../assets/hp-image.png'

class homepage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <header>
                    <ul className='nav-home'>
                        <li className='logo'>TodoListApp</li>
                        <li className='log-in dec'><a className='login-link' href="/login" >Log in</a></li>
                        <li className='sign-up dec'><a className='signup-link' href="/signup" >Sign up</a></li>
                    </ul>
                </header>

                <div id='session-1'>
                    <div className='container'>
                        <div className='text-intro'>
                            <h1 className='title'>Welcome to TodoListApp<br/>
                            Let us create our world and schedule your plan
                            
                            </h1>
                            <p className='hp-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p className='btn-signup'>
                                <a className='btn-text' href='/signup'>SIGN UP - IT'S FREE NOW! </a>
                            </p>
                        </div>

                        <div className='image'>
                            <img alt='cover' className='hp-image' src={hpimage}></img>
                        </div>
                    </div>
                </div>

                <div id='session-2'>
                    <div className='container-2'>
                        <div className='s2-c2-title'>
                            <h1 className='t2-feature'>NEW FEATURE</h1>
                        </div>
                        <div className='s2-c2-body'>
                            <h1 className='t2-body'>COOMING SOON !</h1>
                            <div className='move yell'></div>
                            <div className='move red'></div>
                            <div className='move orange'></div>
                            <div className='move green'></div>
                            <div className='move g1'></div>
                            <div className='move g2'></div>
                            <div className='move g3'></div>

                        </div>
                    </div>

                </div>

                <div id='session-3'>
                    <div className='container-3'>
                        <div className='s3-c3-title'>
                            <h1 className='t3-feature'>CREATE YOUR PLAN WITH TODOLIST APP</h1>
                        </div>
                    </div>

                </div>

                
                <div id='ft'>
                    <ul className='ft-nav'>
                        <li className='ft-about fts'><a className='ft-a' href='/about'>About</a></li>
                        <li className='ft-help fts'><a className='ft-a' href='/help'>Help</a></li>
                        <li className='ft-privacy fts'><a className='ft-a' href='/privacy'>Privacy</a></li>
                    </ul>
                    <h2 className='comp'>USER EXPERIENCE RESEARCHERS</h2>
                    <p className='copyright'> © Copyright 2019. All rights reserved.</p>
                </div>
                
            </React.Fragment>
        )
    }
}

export default homepage;