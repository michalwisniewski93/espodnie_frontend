import React, {useEffect, useState} from 'react'
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { FaHeart } from 'react-icons/fa';
import axios from 'axios'

const MyOrders = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isUserLogged = useSelector(state => state.isUserLogged)
   

    const [orders, setOrders] = useState([])
    const userLogged = useSelector(state => state.user);
    const filtredOrders = orders.filter(order => order.customerlogin === userLogged)

    const handleDisplayFavourites = () => {
        navigate('/favourites')
    }


    useEffect(() => {
        axios.get('http://localhost:5000/orders')
        .then((response) => setOrders(response.data))
        .catch((err) => console.log('error fetching orders error: ' + err))
    }, [])
    return (
        <div className="app">
            <Header/>
            <section className="topButtons">
                                    {isUserLogged? <div><span>Zalogowano jako: {userLogged}</span><button onClick={handleDisplayFavourites}><FaHeart size={10} color="red" /> Ulubione</button></div> : null }
                                    
            </section>
            <h1>Moje zamówienia</h1>
            <div className="myOrders">
            {filtredOrders.map(order => (
  <div key={order.id} className="myOrdersItem">
    <h1>Data zamówienia: {order.date}</h1>
    <h2>Kwota zamówienia: {order.amount} zł</h2>

    {/* Drugi map - lista produktów z tego zamówienia */}
    {order.boughtProducts.map(bp => (
      <div key={bp.id} className="boughtProductsInOrder"><div className="productThumbnail"><img src={`http://localhost:5000/${bp.imageurl}`}/></div><div className="productInfoOrder"><h3>{bp.productname}</h3><h3>Cena: {bp.price} PLN</h3></div></div>
    ))}
  </div>
)).reverse()}

            </div>
            <Footer/>
        </div>
    )
}

export default MyOrders;