import React, { Component } from 'react'
import NavBar from '../navBar/NavBar'
import './Header.css'

export default class Header extends Component {
    render() {
        return (
            <header>
                <NavBar/> 
            </header>
        )
    }
}
