import React from 'react'
import './NotFound.css'
export const NotFound = () => {
    return (
        <>
            <div className="formContainer">

                <h1>Ups! No ha sido posible encontrar esta página</h1>
            
                <div className='NotFoundContainer'>
                    <img className="notFound" src={'../Error.svg'} alt='notFound'/>
                </div>
            </div>
            
        </>
    )
}