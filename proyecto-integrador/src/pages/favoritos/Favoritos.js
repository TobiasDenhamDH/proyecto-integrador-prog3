import React, { Component } from 'react'
import Card from '../../components/card/Card'
import "./Favoritos.css"

export default class Favoritos extends Component {
    constructor(props){
        super(props)
        this.state = {
            favoritos: [],
            cargando: false,
            //leyenda: JSON.parse(localStorage.getItem('favoritos')).some((fav)=> fav.id === this.props.peliculas.id)
        }
    }

    componentDidMount(){ // traer lo que hay en local storage
        this.state.cargando= true
        this.setState({favoritos: JSON.parse(localStorage.getItem("favoritos")) || ['']})
        
        //console.log(this.state.leyenda)
    }

    handleFavoritos(card){
        if (this.state.favoritos.some(fav => card.id === fav.id)) {
            this.setState({favoritos: this.state.favoritos.filter(item => item.id !== card.id)}, () => {
                localStorage.setItem("favoritos", JSON.stringify(this.state.favoritos))
            })
            console.log(this.state.favoritos.filter(item => item.id !== card.id))
        } else {
            this.setState({favoritos: [...this.state.favoritos, card]}, () => {
                localStorage.setItem("favoritos", JSON.stringify(this.state.favoritos))
            })
        }
    }

    render() {
        return (
            <>
            {this.state.cargando === false? <><img className="notFound" src={'../Error.svg'} alt='notFound'/></> : <>
                <div className='container'>
                    
                    <h1>Favoritos</h1>

                    {this.state.favoritos.length === 0  ? 
                    
                    <strong><h1>No tienes peliculas agregadas a favoritos</h1></strong>
                    
                    :

                    <section className="cardContainer">
                        {this.state.favoritos.map(pelicula => (
                            <Card key={pelicula.id} peliculas={pelicula} favorito={(fav) => this.handleFavoritos(fav)}/>
                        ))}
                    </section>
                    }

                </div>
            </>}          
            </>
        )
    }
}

