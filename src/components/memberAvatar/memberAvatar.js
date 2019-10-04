import React from 'react'
import './memberAvatar.scss'
import { DropdownButton, Dropdown } from 'react-bootstrap'

export class memberAvatar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            member: [
                {
                    lastName: 'An',
                    firstName: 'Truong'
                },
                {
                    lastName: 'Hieu',
                    firstName: 'Nguyen'
                },
                {
                    lastName: 'Huy',
                    firstName: 'Nhat'
                },
                {
                    lastName: 'An',
                    firstName: 'Binh'
                },
                {
                    lastName: 'Bao',
                    firstName: 'Gia'
                },
                {
                    lastName: 'Bao',
                    firstName: 'Gia'
                },
                {
                    lastName: 'Bao',
                    firstName: 'Gia'
                },
                {
                    lastName: 'Bao',
                    firstName: 'Gia'
                },
                {
                    lastName: 'Bao',
                    firstName: 'Gia'
                },
                {
                    lastName: 'An',
                    firstName: 'Kien'
                },
                {
                    lastName: 'An',
                    firstName: 'Kien'
                },
                {
                    lastName: 'An',
                    firstName: 'Kien'
                },
                {
                    lastName: 'An',
                    firstName: 'Kien'
                },
            ],
            memberShow: [],
            count: 0
        }

    }

    componentDidMount() {
        this.checkLeftMember()
    }

    checkLeftMember = () => {
        let num = this.state.member.length - 5

        for (var i = 0; i < 5; i++) {
            this.state.memberShow.push(this.state.member[i])
        }

        this.setState({
            count: num
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className='ava-mem-zone'>
                    {
                        this.state.memberShow.map((value, index) => {
                            let FN = value.firstName.slice(0, 1),
                                LN = value.lastName.slice(0, 1)
                            let name = FN + LN
                            let fullname = value.lastName + ' ' + value.firstName

                            return (
                                <div key={index} className='member-ava' title={fullname}>
                                    <p className='member-name'>{name}</p>
                                </div>
                            )

                        })
                    }

                    <DropdownButton
                        className='member-left'
                        alignLeft
                        title={<p className='member-count'>{'+' + this.state.count}</p>}
                        id="dropdown-menu-align-left"
                    >
                        <h3 className='dropdown-header' eventkey="1">Board Members</h3>
                        <Dropdown.Divider />
                        <div className='full-member'>
                            {
                                this.state.member.map((value, index) => {
                                    let FN = value.firstName.slice(0, 1),
                                        LN = value.lastName.slice(0, 1)
                                    let name = FN + LN
                                    let fullname = value.lastName + ' ' + value.firstName
                                    return (
                                        <div key={index} className='member-ava' title={fullname}>
                                            <p className='member-name'>{name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </DropdownButton>
                </div>
            </React.Fragment>
        )
    }
}

export default memberAvatar
