import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

export default class NavBar extends Component {
    render() {
        return (
            <>
                <nav>
                    <ul className="main-nav">
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/favoritos">Peliculas Favoritas</Link></li>

                    </ul>
                </nav>
            </>
        )
    }
}
