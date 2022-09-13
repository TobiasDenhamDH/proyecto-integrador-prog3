import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import './Home.css'

export default class Home extends Component {

    constructor(){
        super()
        this.state={
            cargando:false,
            peliculasPopulares: [],
            peliculasMasValoradas: [],
            resultados: [],
            filterBy:'',
            nextUrl:'',
            favoritos: []
        }
    }

    componentDidMount(){
        if (localStorage.length > 0) {
            this.setState({favoritos: JSON.parse(localStorage.getItem('favoritos')) || ['']})
        } else{
            localStorage.setItem('favoritos', JSON.stringify(this.state.favoritos))            
        }

        const urlPopulares = 'https://api.themoviedb.org/3/movie/popular?api_key=c0945689b0a582e110971301d6ea8be2&language=es'
        fetch(urlPopulares)
            .then((res)=>res.json())
            .then(data=>this.setState({
                peliculasPopulares: data.results.slice(0,8), 
                cargando:true,
                nextUrl: data.page.next
            }))
            .catch((err)=>{console.log(err)})

        const urlValoradas = `https://api.themoviedb.org/3/movie/top_rated?api_key=c0945689b0a582e110971301d6ea8be2&language=es`
        fetch(urlValoradas)
            .then((res)=>res.json())
            .then(data=>this.setState({
                peliculasMasValoradas: data.results.slice(0,8), 
                cargando:true,
                nextUrl: data.page.next
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

    filter(filtro){
        const urlFiltro = `https://api.themoviedb.org/3/search/movie?api_key=c0945689b0a582e110971301d6ea8be2&language=es&query=${filtro}` // no funciona 
        fetch(urlFiltro)
            .then((res)=>res.json())
            .then(data=> this.setState({peliculasPopulares: data.results}))
            .catch((err)=>{console.log(err)})
    }

    handleChange(e){
        this.setState({
            filterBy: e.target.value
        }, ()=>{this.filter(this.state.filterBy)})
    }

    render() {
        return (
            <>
                <div className='formContainer'> 
                    <form>
                        <input type='search' name='search' placeholder='Buscar' onChange={(e)=>{this.handleChange(e)}} value={this.state.filterBy}/>
                        <button>Buscar</button>
                    </form>
                <div>
                    <h1>Peliculas populares</h1>
                    <Link to='/populares'><button className='btn-mas'>Ver más</button></Link>
                </div>
                </div>

                <section className= 'cardContainer'>

                    {this.state.peliculasPopulares.map(pelicula =>
                        <Card key={pelicula.id} peliculas={pelicula} favorito={(fav) => this.handleFavoritos(fav)}/>             
                    )}
                
                </section>

                <div>
                    <h1>Peliculas Más Valoradas</h1>
                    <Link to='/masvaloradas'><button className='btn-mas'>Ver más</button></Link>
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

