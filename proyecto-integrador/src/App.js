import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

// Import de pages
import Home from './pages/home/Home'
import Favoritos from './pages/favoritos/Favoritos'
import Detalle from './pages/detalle/Detalle'
import { NotFound } from './pages/notFound/NotFound'

// Import de components
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/favoritos' component={Favoritos}/>
        <Route path='/detalle/id/:id' component={Detalle}/>

        <Route component={NotFound}/>

      </Switch>

      <Footer/>
    </BrowserRouter>
  )
}

