import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

export default class NavBar extends Component {
    render() {
        return (
            <>
                <nav>
                    
                    <ul className="logo">
                        <li>
                            <Link to="/"><img className='nav-img' src={'../logo.svg'} alt='logo'/></Link>
                        </li>
                    </ul>
                
                    <ul className="main-nav">
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/favoritos">Favoritos</Link></li>
                        <li><Link to="/populares">Peliculas Populares</Link></li>
                        <li><Link to="/masvaloradas">Peliculas Más Valoradas</Link></li>
                        <li><Link to="/Detalle/id/id:">Detalle</Link></li>
                    </ul>

                </nav>
            </>
        )
    }
}
