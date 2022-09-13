import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

export default class Card extends Component {

    constructor(props){
        super(props)
        this.state = {
            boton: JSON.parse(localStorage.getItem('favoritos')).some((fav)=> fav.id === this.props.peliculas.id)
        }
    }

    handleButton(){
        this.setState({boton: !this.state.boton}, ()=>{this.props.favorito(this.props.peliculas)})
    }
    
    render() {
        //let {poster_path, title, overview,release_date, vote_average, id} = this.props.peliculas
        let img = 'https://image.tmdb.org/t/p/w342'

        return (
            <>
                <article  className='item-card'>
                
                <Link to={`/detalle/id/${this.props.peliculas.id}`}>
                    <img src={`${img}${this.props.peliculas.poster_path}`}alt="" />
                </Link>
                <h2>{this.props.peliculas.title}</h2>
                <p className='decripcion'>{this.props.peliculas.overview}</p>
                <p><strong>Fecha de estreno:</strong> {this.props.release_date}</p>
                <p> <strong>Rating:</strong> {this.props.peliculas.vote_average}</p>
                <p className='more'>Ver más</p>
                {/* <a className='more' href="/">location url</a> */}
                {/* <a className='delete' href='/' onClick={()=>props.borrar(id)} >Borrar</a> */}
                <button className='buttonFav' onClick={()=> this.handleButton()}>{this.state.boton ? 'Quitar' : 'Agregar'}</button>
                </article>
            </>
        )
    }
}


