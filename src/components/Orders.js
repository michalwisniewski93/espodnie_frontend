import React, { useEffect, useState} from 'react'
import Header from './Header';
import Footer from './Footer';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


const Orders = () => {

const [orders, setOrders] = useState([])
const navigate = useNavigate()
const [invoices, setInvoices] = useState([])

    const handleLogOut = () => {
       
        
        
        navigate('/admin')
        
        
        
        }

   const handleMenu = () => {
    navigate('/login')
   }


   useEffect(() => {
    axios.get('http://localhost:5000/orders')
    .then((response) => setOrders(response.data))
    .catch((err) => console.log('error fetching orders error: ' + err) )
   }, [])


   const handleMakeInvoice = (customername, customersurname, customercompanyname, customercompanystreet, customercompanypostcode, customercompanycity, customeremail, customerphonenumber, customercompanynip, customercompanyregon, boughtProducts, date, amount) => {
    axios.post("http://localhost:5000/invoices", {customername, customersurname, customercompanyname, customercompanystreet, customercompanypostcode, customercompanycity, customeremail, customerphonenumber, customercompanynip, customercompanyregon, boughtProducts, date, amount})
        .then((response => setInvoices([...invoices, response.data])))
        .catch(err => console.error('Error adding invoices', err))
    alert('Faktura została wystawiona.')
   }



    return (
        <div className="app">
    
        <Header/>
       
       <h1>Zamówienia</h1>
       <section className="topButtons">
       <button onClick={handleMenu}>Powrót do menu</button> <button onClick={handleLogOut}>Wyloguj się</button>
       </section>
       {orders.map(order => (
  <div key={order._id} className="myOrdersItem">
    <h1>Data zamówienia: {order.date}</h1>
    <h2>Kwota zamówienia: {order.amount} PLN</h2>
    <h4>Imię i nazwisko klienta: {order.customername} {order.customersurname}</h4>
    <h4>Adres klienta: {order.customerstreet} {order.customerpostcode} {order.customercity}</h4>
    <h4>Nazwa firmy: {order.customercompanyname}</h4>
    <h4>Adres firmy: {order.customercompanystreet} {order.customercompanypostcode} {order.customercompanycity}</h4>
    <h4>E-mail: {order.customeremail}</h4>
    <h4>Login: {order.customerlogin}</h4>
    <h4>Nr telefonu: {order.customerphonenumber}</h4>
    <h4>NIP: {order.customercompanynip}</h4>
    <h4>REGON: {order.customercompanyregon}</h4>
    <button className="makeInvoice" onClick={() => handleMakeInvoice(order.customername, order.customersurname, order.customercompanyname, order.customercompanystreet, order.customercompanypostcode, order.customercompanycity, order.customeremail, order.customerphonenumber, order.customercompanynip, order.customercompanyregon, order.boughtProducts, order.date, order.amount )}>Wystaw fakturę</button>

    {/* Drugi map - lista produktów z tego zamówienia */}
    {order.boughtProducts.map(bp => (
      <div key={bp.id} className="boughtProductsInOrder"><div className="productThumbnail"><img src={`http://localhost:5000/${bp.imageurl}`}/></div><div className="productInfoOrder"><h3>{bp.productname}</h3><h3>Cena: {bp.price} PLN</h3></div></div>
    ))}
  </div>
)).reverse()}
        

        <Footer/>
    </div>
    )
}

export default Orders;