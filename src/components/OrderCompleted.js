import React, {useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import { FaCheck, FaHeart } from "react-icons/fa";

import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


const OrderCompleted = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const resetBoughtProducts = () => dispatch({type: 'RESET_BOUGHT_PRODUCTS'})

    const isUserLogged = useSelector(state => state.isUserLogged)
    const userLogged = useSelector(state => state.user);



    useEffect(() => {
        resetBoughtProducts()
    }, [])

    const handleDisplayFavourites = () => {
        navigate('/favourites')
    }

   
    return(
        
        <div className="app">
            <Header/>
            <section className="topButtons">
                        {isUserLogged? <div><span>Zalogowano jako: {userLogged}</span><button onClick={handleDisplayFavourites}><FaHeart size={10} color="red" /> Ulubione</button></div> : null }
                        
                    </section>
            <div className="orderInfo">
                <h1>Zamówienie zrealizowane <FaCheck color="green" /></h1>
            </div>
            <Footer/>
        </div>
      
    )

}

export default OrderCompleted