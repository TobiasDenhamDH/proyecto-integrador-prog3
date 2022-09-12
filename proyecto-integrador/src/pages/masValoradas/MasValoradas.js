import React, { Component } from 'react'
import Card from '../../components/card/Card'
import '../masValoradas/MasValoradas.css'

export default class MasValoradas extends Component {

    constructor(){
        super()
        this.state={
            cargando:false,
            peliculasMasValoradas: [],
            filterBy:'',
            nextUrl:'',
            favoritos: []
        }
    
    }

    componentDidMount(){
        this.setState({favoritos: JSON.parse(localStorage.getItem('favoritos')) || ['']})
        localStorage.setItem('favoritos', JSON.stringify(this.state.favoritos))

        const urlValoradas = `https://api.themoviedb.org/3/movie/top_rated?api_key=c0945689b0a582e110971301d6ea8be2&language=es`
        fetch(urlValoradas)
            .then((res)=>res.json())
            .then(data=>this.setState({
                peliculasMasValoradas: data.results, 
                cargando:true,
                page: data.page
    
            }))
            
            .catch((err)=>{console.log(err)})
    
    }

    agregarMas(){
        const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=c0945689b0a582e110971301d6ea8be2&language=es&page=${this.state.page+1}`
        fetch(url)
            .then((res)=>res.json())
            .then(data=>this.setState({
                page:data.page,
                peliculasMasValoradas: this.state.peliculasMasValoradas.concat(data.results)
                
            }))
            .catch((err)=>{console.log(err)})
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
            <div>
                <h1>Peliculas Más Valoradas</h1>
                <button className="btn-mas" onClick={()=>this.agregarMas()} >Cargar Más Peliculas</button>
            </div>


                <section className= 'cardContainer'>

                    {this.state.peliculasMasValoradas.map(pelicula =>
                        <Card key={pelicula.id} peliculas={pelicula} favorito={(fav) => this.handleFavoritos(fav)}/>             
                    )}
                
                </section>

            </>
        )
    }
}
