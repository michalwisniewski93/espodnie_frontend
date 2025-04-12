import React, {useEffect, useState} from 'react'
import Header from './Header';
import Footer from './Footer';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


const Clients = () => {


    const [customers, setCustomers] = useState([])


    useEffect(() => {
        axios.get('http://localhost:5000/customers')
        .then((response) => setCustomers(response.data))
        .catch((err) => console.log('error fetching customers, error: ' + err))
    }, [])


const navigate = useNavigate()

    const handleLogOut = () => {
       
        
        
        navigate('/admin')
        
        
        
        }

   const handleMenu = () => {
    navigate('/login')
   }

   const handleDeleteCustomer = (id) => {

    axios.delete(`http://localhost:5000/customers/${id}`)
      .then(() => setCustomers(customers.filter(customer => customer._id !== id)))
      .catch((err) => console.error("Error deleting customer:", err));

   }


    return (
        <div className="app">
    
        <Header/>
       
       <h1>Klienci ({customers.length})</h1>
       <section className="topButtons">
       <button onClick={handleMenu}>Powrót do menu</button> <button onClick={handleLogOut}>Wyloguj się</button>
       </section>
       <div className="customersProfiles">
        {
            customers.map(customer => (<div className="customerProfile" key={customer._id}>
                <p><span className="property">imię:</span> {customer.name} <span className="property">nazwisko:</span> {customer.surname}</p>
                <p><span className="property">adres:</span> {customer.street} {customer.postcode} {customer.city}</p>
                <p><span className="property">e-mail:</span> {customer.email}  </p>
                <p><span className="property">nr telefonu:</span> {customer.phonenumber}</p>
                <p><span className="property">login:</span> {customer.login} <span className="property">hasło:</span> {customer.password} </p>
                {customer.invoice ? <p><span className="property">faktura:</span> TAK</p> : null }
                {customer.companyname !== null || customer.companyname !== '' ? <p><span className="property">nazwa firmy:</span> {customer.companyname}</p>: null}
                {customer.companystreet !== null || customer.companystreet !== '' ? <p><span className="property">adres firmy:</span>ul. {customer.companystreet}</p>: null}
                {customer.companypostcode !== null || customer.companypostcode !== '' ? <p><span className="property">kod pocztowy:</span> {customer.companypostcode}</p>: null}
                {customer.companycity !== null || customer.companycity !== '' ? <p><span className="property">miejscowość:</span> {customer.companycity}</p>: null}
                {customer.companynip !== null || customer.companynip !== '' ? <p><span className="property">NIP:</span> {customer.companynip}</p>: null}
                {customer.companyregon !== null || customer.companyregon !== '' ? <p><span className="property">REGON:</span> {customer.companyregon}</p>: null}
                {customer.regulations ? <p><span className="property">Akceptacja regulaminu:</span>TAK</p>: <p><span className="property">Akceptacja regulaminu:</span>NIE</p>}
                {customer.newsletter ? <p><span className="property">Subskrypcja newsletteru:</span>TAK</p>: <p><span className="property">Subskrypcja newsletteru:</span>NIE</p>}
                <button className="removeCustomer" onClick={() => handleDeleteCustomer(customer._id)}>Usuń klienta</button>
            </div>))
        }
       </div>

 
        

        <Footer/>
    </div>
    )
}

export default Clients;