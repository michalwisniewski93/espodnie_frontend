import React from 'react'
import Header from './Header';
import Footer from './Footer';
import {Link, useNavigate} from 'react-router-dom'


const LogIn = () => {


const navigate = useNavigate()

    const handleLogOut = () => {
       
        
        
        navigate('/admin')
        
        
        
        }



    return (
        <div className="app">
    
        <Header/>
       
       <h1>Witaj w panelu administracyjnym</h1>
       <section className="topButtons">
        <button onClick={handleLogOut}>Wyloguj się</button>
       </section>

       <div className="adminMenu">
    <nav>
        <ul>
            <li>
                <Link to="/products-store">Produkty & Magazyn</Link>
            </li>
            <li>
                <Link to="/product-categories">Kategorie produktów</Link>
            </li>
            <li>
                <Link to="/clients">Klienci</Link>
            </li>
            <li>
                <Link to="/orders">Zamówienia</Link>
            </li>
            <li>
                <Link to="/invoices">Faktury</Link>
            </li>
            <li>
                <Link to="/subsites">Podstrony</Link>
            </li>
            <li>
                <Link to="/shop-data">Dane sklepu</Link>
            </li>
        </ul>
    </nav>

</div>
        

        <Footer/>
    </div>
    )
}

export default LogIn;