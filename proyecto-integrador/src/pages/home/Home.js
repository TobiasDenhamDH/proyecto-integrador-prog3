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
            filterBy:'',
            resultados: [],
            favoritos: []
        }
    }

    componentDidMount(){
        if (localStorage.length > 0) {
            this.setState({favoritos: JSON.parse(localStorage.getItem('favoritos')) || ['']})
        }else{
            localStorage.setItem('favoritos', JSON.stringify(this.state.favoritos))            
        }

        const urlPopulares = 'https://api.themoviedb.org/3/movie/popular?api_key=c0945689b0a582e110971301d6ea8be2&language=es'
        fetch(urlPopulares)
            .then((res)=>res.json())
            .then(data=>this.setState({
                peliculasPopulares: data.results.slice(0,8), 
                cargando:true,
            }))
            .catch((err)=>{console.log(err)})

        const urlValoradas = `https://api.themoviedb.org/3/movie/top_rated?api_key=c0945689b0a582e110971301d6ea8be2&language=es`
        fetch(urlValoradas)
            .then((res)=>res.json())
            .then(data=>this.setState({
                peliculasMasValoradas: data.results.slice(0,8), 
                cargando: true,
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
        const urlFiltro = `https://api.themoviedb.org/3/search/movie?api_key=c0945689b0a582e110971301d6ea8be2&language=es&query=${filtro}` 
        fetch(urlFiltro)
        .then((res)=>res.json())
        .then(data=> this.setState({resultados: data.results}))
        .catch((err)=>{console.log(err)}) 
            
    }

    handleChange(e){
        if (e.target.value.length === 0) {
            e.preventDefault()
            this.setState(
                { filterBy: '',
                resultados: []})
        } else {
            this.setState(
                {filterBy: e.target.value}, 
                ()=>{this.filter(this.state.filterBy)})
        }
        //console.log (e.target.value)
    }

    render() {
        return (
            <>
             {this.state.cargando === false? <><img className="notFound" src={'../Error.svg'} alt='notFound'/></> : 
             
             <>
                <div className='searchContainer'> 

                        <input type='search' name='search' placeholder='Buscar películas...' onChange={(e)=>{this.handleChange(e)}} value={this.state.filterBy}/>

                </div>

                {this.state.resultados.length ? 

                <div className='searchContainer2'>

         
                    <h1>Resultados de búsqueda</h1>
               

                <section className= 'cardContainer'>

                    {this.state.resultados.map(resultado=>
                        <Card key={resultado.id} peliculas={resultado} favorito={(fav) => this.handleFavoritos(fav)}/>
                    )}
                
                </section> 
                
                </div>

                : this.state.filterBy?

                <div className='searchContainer'>

                    <div>
                        <h1>No hubo coincidencias con la búsqueda</h1>
                    </div>

                </div>

                :
                
                <div className='searchContainer'>


                    <h1>Peliculas populares</h1>
                    <Link to='/populares'><button className='btn-mas'>Ver todas</button></Link>
            

                <section className= 'cardContainer'>

                    {this.state.peliculasPopulares.map(pelicula =>
                        <Card key={pelicula.id} peliculas={pelicula} favorito={(fav) => this.handleFavoritos(fav)}/>             
                    )}
                
                </section>

             
                    <h1>Peliculas Más Valoradas</h1>
                    <Link to='/masvaloradas'><button className='btn-mas'>Ver todas</button></Link>
              

                <section className= 'cardContainer'>

                    {this.state.peliculasMasValoradas.map(pelicula =>
                        <Card key={pelicula.id} peliculas={pelicula} favorito={(fav) => this.handleFavoritos(fav)}/>             
                    )}
                
                </section>

                </div>
                }
            </>}
                
            </>
        )
    }
}

