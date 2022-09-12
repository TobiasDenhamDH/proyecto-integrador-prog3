import React, { Component } from 'react'
import Card from '../../components/card/Card'
import "./Favoritos.css"

export default class Favoritos extends Component {
    constructor(props){
        super(props)
        this.state = {
            favoritos: []
        }
    }

    componentDidMount(){ // traer lo que hay en local storage
        // localStorage.setItem('favoritos', this.state.favoritos || [])
        this.setState({favoritos: JSON.parse(localStorage.getItem("favoritos"))})
    }

    handleFavoritos(card){
        if (this.state.favoritos.some(fav => card.id === fav.id)) {
            // texto agregar a favoritos
            this.setState({favoritos: this.state.favoritos.filter(item => item.id !== card.id)}, () => {
                localStorage.setItem("favoritos", JSON.stringify(this.state.favoritos))
                // texto quitar de favoritos
            })
            console.log(this.state.favoritos.filter(item => item.id !== card.id))
        } else {
            this.setState({favoritos: [...this.state.favoritos, card]}, () => {
                localStorage.setItem("favoritos", JSON.stringify(this.state.favoritos))
                // texto quitar de favoritos
            })
        }
    }

    render() {
        return (
            <div className="cardContainer">
                {/* Condicional para cuando no hay nada en favoritos
                <p className='leyendaFav'></p>
                {() => {
                    if (this.state.favoritos === null) {
                        let leyendaFav = document.querySelector(".leyendaFav");
                        console.log(leyendaFav)
                        leyendaFav.innerText = "No tienes agregados a favoritos"
                    }
                }} */}
                {this.state.favoritos.map(pelicula => (
                    <Card key={pelicula.id} peliculas={pelicula} favorito={(fav) => this.handleFavoritos(fav)}/>
                ))}
            </div>
        )
    }
}

