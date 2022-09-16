import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

export default class Card extends Component {

    constructor(props){
        super(props)
        this.state = {
            boton: JSON.parse(localStorage.getItem('favoritos')).some((fav)=> fav.id === this.props.peliculas.id),
            descripcion: false,
        }
    }
    vermas = () => { 
        this.setState({descripcion: !this.state.descripcion})
    }

    handleButton(){
        this.setState({boton: !this.state.boton}, ()=>{this.props.favorito(this.props.peliculas)})
    }
    
    render() {

        let img = 'https://image.tmdb.org/t/p/w342'

        return (
            <>
                <article  className='item-card'>
                <Link to={`/detalle/id/${this.props.peliculas.id}`}>
                    <img src={`${img}${this.props.peliculas.poster_path}`}alt="" />
                </Link>
                <h2>{this.props.peliculas.title}</h2>
                <p className='more' onClick={this.vermas}><strong>Ver más</strong></p>
                {this.state.descripcion === false? <></> : <p> {this.props.peliculas.overview} </p>}
                <button className='buttonFav' onClick={()=> this.handleButton()}>{this.state.boton ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}</button>
                </article>
            </>
        )
    }
}


