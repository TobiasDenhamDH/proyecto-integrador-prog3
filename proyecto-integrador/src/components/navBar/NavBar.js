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
                        <li><Link to="/favoritos">Favoritos</Link></li>
                        <li><Link to="/populares">Peliculas Populares</Link></li>
                        <li><Link to="/cartelera">Peliculas en Cartelera</Link></li>

                    </ul>
                </nav>
            </>
        )
    }
}
