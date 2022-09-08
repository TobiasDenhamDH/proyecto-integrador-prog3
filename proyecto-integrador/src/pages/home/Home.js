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
        // this.setState({favoritos: localStorage.getItem('favoritos') || []})
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

    render() {
        return (
            <>

                {/* <h2>Peliculas populares</h2> */}

                {/* <button onClick={()=>this.agregarMas()} >Mas Personajes</button> */}

                <section className= 'cardContainer'>

                    {this.state.peliculas.map(pelicula =>
                    
                        <Card key={pelicula.id} peliculas={pelicula} />             
         
                    )}
                
                </section>
                
            </>
        )
    }
}

