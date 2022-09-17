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
            page:'',
            favoritos: [],
            peliculasFiltradas: []
        }
    
    }

    componentDidMount(){
        this.setState({favoritos: JSON.parse(localStorage.getItem('favoritos')) || ['']})

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
                peliculasMasValoradas: data.results.concat(this.state.peliculasMasValoradas)
                
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
        console.log(filtro)
        let masValoradasFiltradas = this.state.peliculasMasValoradas.filter((pelicula => pelicula.title.includes(filtro)))
        this.setState({peliculasFiltradas: masValoradasFiltradas})      
    }

    handleChange(e){
        if (e.target.value.length === 0) {
            e.preventDefault()
            this.setState(
                {filterBy: '',
                peliculasFiltradas: []
            })
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
            {this.state.cargando === false? <><img className="notFound" src={'../Error.svg'} alt='notFound'/></> : <>
                
                <div className='formContainer'> 
                        <form>
                            <input type='search' name='search' placeholder='Buscar películas' onChange={(e)=>{this.handleChange(e)}} value={this.state.filterBy}/>
                        </form>
                </div>

                {this.state.peliculasFiltradas.length ?

                <div className='formContainer'>

                    <div>
                        <h1>Peliculas Más Valoradas</h1>
                        <button className="btn-mas" onClick={()=>this.agregarMas()} >Cargar Más Peliculas</button>
                    </div>

                    <section className= 'cardContainer'>

                        {this.state.peliculasFiltradas.map(pelicula =>
                            <Card key={pelicula.id} peliculas={pelicula} favorito={(fav) => this.handleFavoritos(fav)}/>             
                        )}
                    
                    </section>
                
                </div>

                :

                <div className='formContainer'>

                    <div>
                        <h1>Peliculas Más Valoradas</h1>
                        <button className="btn-mas" onClick={()=>this.agregarMas()} >Cargar Más Peliculas</button>
                    </div>

                    <section className= 'cardContainer'>

                        {this.state.peliculasMasValoradas.map(pelicula =>
                            <Card key={pelicula.id} peliculas={pelicula} favorito={(fav) => this.handleFavoritos(fav)}/>             
                        )}
                    
                    </section>

                </div>}

            </>}

            </>
        )
    }
}
