import React, { Component } from 'react'
import Card from '../../components/card/Card'
import './Home.css'

export default class Home extends Component {

    constructor(){
        super()
        this.state={
            cargando:false,
            peliculas: [],
            filterBy:'',
            nextUrl:'',
            favoritos: []
        }
    
    }

    componentDidMount(){
        console.log(this.state.favoritos)
        this.setState({favoritos: JSON.parse(localStorage.getItem('favoritos'))})
        const url = 'https://api.themoviedb.org/3/movie/popular?api_key=c0945689b0a582e110971301d6ea8be2&language=es'
        fetch(url)
            .then((res)=>res.json())
            .then(data=>this.setState({
                peliculas: data.results, 
                cargando:true,
                paginas: data.page.next

            }))
            .catch((err)=>{console.log(err)})
    
    }

    agregarMas(){
        const url = this.state.nextUrl
        fetch(url)
            .then((res)=>res.json())
            .then(data=>this.setState({
                nextUrl:data.info.next,
                peliculas: this.state.peliculas.concat(data.results)
                
            }))
            .catch((err)=>{console.log(err)})
    }

    // deleteCard(id){
    //     const resto = this.state.peliculas.filter(personaje => personaje.id !== id) // se guardan en la variable todos los elementos con id distinto del recibido
    //     this.setState({peliculas: resto})
    // }

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
            <>

                {/* <h2>Peliculas populares</h2> */}

                {/* <button onClick={()=>this.agregarMas()} >Mas Personajes</button> */}

                <section className= 'cardContainer'>

                    {this.state.peliculas.map(pelicula =>
                        <Card key={pelicula.id} peliculas={pelicula} favorito={(fav) => this.handleFavoritos(fav)}/>             
                    )}
                
                </section>
                
            </>
        )
    }
}

