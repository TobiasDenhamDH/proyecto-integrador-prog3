import React, { Component } from 'react'
import './Card.css'

export default class Card extends Component {

    constructor(props){
        super(props)
        this.state = {
            boton: ''
        }
    }

    
    render() {
        let {poster_path, title, overview,release_date, vote_average, id} = this.props.peliculas
        let img = 'https://image.tmdb.org/t/p/w342'
        const favs = JSON.parse(localStorage.getItem('favoritos')) 
        let res = favs.find((fav)=> fav.id === id)

        return (
            <>
                <article  className='item-card'>
                
                <img src={`${img}${poster_path}`}alt="" />
                <h2>{title}</h2>
                <p className='decripcion'>{overview}</p>
                <p><strong>Fecha de estreno:</strong> {release_date}</p>
                <p> <strong>Rating:</strong> {vote_average}</p>
                <p className='more'>Ver más</p>
                {/* <a className='more' href="/">location url</a> */}
                {/* <a className='delete' href='/' onClick={()=>props.borrar(id)} >Borrar</a> */}
                <button className='buttonFav' onClick={()=>{this.props.favorito(this.props.peliculas)}}>{res ? 'Quitar' : 'Agregar'}</button>

                </article>
            </>
        )
    }
}


