import React from 'react'
import './Card.css'

export default function Card(props) {
    let {poster_path, title, overview,release_date, vote_average, id} = props.peliculas
    let img = 'https://image.tmdb.org/t/p/w342'

    return (
        <>
            <article  className='item-card'>
             
             <img src={`${img}${poster_path}`}alt="" />
             <h2>{title}</h2>
             <p className='decripcion'>{overview}</p>
             <p><strong>Fecha de estreno:</strong> {release_date}</p>
             <p> <strong>Rating:</strong> {vote_average}</p>
             <p className='more'>Ver más</p>
             {/* <a className='more' href="/">location url</a> */}
             {/* <a className='delete' href='/' onClick={()=>props.borrar(id)} >Borrar</a> */}
             <button className='buttonFav' onClick={()=>{props.favorito(props.peliculas)}}>Favoritos</button>
            </article>
        </>
    )
}
