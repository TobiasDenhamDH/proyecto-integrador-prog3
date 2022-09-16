import React from 'react'
import './NotFound.css'
export const NotFound = () => {
    return (
        <>
            <h1>Ups! No ha sido posible encontrar esta página</h1>
            <section>
                <img className="notFound" src={'../Error.svg'} alt='notFound'/>
            </section>
            
        </>
    )
}