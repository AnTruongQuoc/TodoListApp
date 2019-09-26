import React, { Component } from 'react'
import './404page.scss'
import otto from '../../assets/otto.png'
import sat from '../../assets/sat.png'
import moon from '../../assets/moon_pink.png'
import bone from '../../assets/bone.png'
import planet from '../../assets/saturn_purple.png'
import pBlue from '../../assets/planet_blue.png'
import pYell from '../../assets/smallplanet_yellow.png'

class errPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='err-page'>
                    <header>
                        <ul className='nav-home'>
                            <li className='logo'>TodoListApp</li>
                            <li className='log-in dec'><a className='login-link' href="/login" >Log in</a></li>
                            <li className='sign-up dec'><a className='signup-link' href="/signup" >Sign up</a></li>
                        </ul>
                    </header>

                    <div className='err-body'>
                        <h5 className='lyw'>Lost your way ?</h5>
                        <div className='img-container'>
                            <img className='errIMG otto' alt='otto' src={otto} />
                            <img className='errIMG sat' alt='sat' src={sat} />
                            <img className='errIMG moon' alt='moon' src={moon} />
                            <img className='errIMG bone' alt='bone' src={bone} />
                            <img className='errIMG planet' alt='planet' src={planet} />
                            <img className='errIMG pBlue' alt='planet_blue' src={pBlue} />
                            <img className='errIMG pYell' alt='splanet_yellow' src={pYell} />
                        </div>
                    
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default errPage
