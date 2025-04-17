import React, {useState, useEffect} from 'react'
import Header from './Header';
import Footer from './Footer';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from 'axios'


const Invoices = () => {


const navigate = useNavigate()
const [invoices, setInvoices] = useState([])

const dispatch = useDispatch()


const setInvoicePresentationNumber = (invoicePresentationNumber) => dispatch({type:'SET_INVOICE_PRESENTATION_NUMBER', invoicePresentationNumber })
const setInvoiceFirstLineOfCustomer = (invoicePresentationFirstLineOfCustomer) => dispatch({type: 'SET_INVOICE_FIRST_LINE_OF_CUSTOMER', invoicePresentationFirstLineOfCustomer})
const setInvoicePresentationNip = (invoicePresentationNipOfCustomer) => dispatch({type: 'SET_INVOICE_PRESENTATION_NIP', invoicePresentationNipOfCustomer})
const setInvoicePresentationPhoneNumber = (invoicePresentationPhoneNumberOfCustomer) => dispatch({type: 'SET_INVOICE_PRESENTATION_PHONE_NUMBER', invoicePresentationPhoneNumberOfCustomer})
const setInvoicePresentationEmail = (invoicePresentationEmailAddressOfCustomer) => dispatch({type: 'SET_INVOICE_PRESENTATION_EMAIL', invoicePresentationEmailAddressOfCustomer})
const setInvoicePresentationBoughtProducts = (invoicePresentationBoughtProducts) => dispatch({type: 'SET_INVOICE_PRESENTATION_BOUGHT_PRODUCTS', invoicePresentationBoughtProducts})
const setInvoicePresentationTotalAmount = (invoicePresentationTotalAmount) => dispatch({type:'SET_INVOICE_PRESENTATION_TOTAL_AMOUNT',invoicePresentationTotalAmount })
const setInvoicePresentationDateOfIssue = (invoicePresentationDateOfIssue) => dispatch({type: 'SET_INVOICE_PRESENTATION_DATE_OF_ISSUE', invoicePresentationDateOfIssue}) 
const handleLogOut = () => {
       
        
        
        navigate('/admin')
        
        
        
        }

   const handleMenu = () => {
    navigate('/login')
   }

   useEffect(() => {
    axios.get('http://localhost:5000/invoices')
    .then((response) => setInvoices(response.data))
    .catch((err) => console.log('error fetching invoices, error: ' + err))
   },[])

   const showInvoice = (id, customername, customersurname, customercompanyname, customercompanystreet, customercompanypostcode, customercompanycity, customeremail, customerphonenumber, customercompanynip, boughtProducts, date, amount) => {
    setInvoicePresentationNumber(id)
    setInvoiceFirstLineOfCustomer(`${customercompanyname} ${customercompanystreet} ${customercompanypostcode} ${customercompanycity}`)
    setInvoicePresentationNip(customercompanynip)
    setInvoicePresentationPhoneNumber(customerphonenumber)
    setInvoicePresentationEmail(customeremail)
    setInvoicePresentationBoughtProducts(boughtProducts)
    setInvoicePresentationTotalAmount(amount)
    setInvoicePresentationDateOfIssue(date)
    navigate('/invoice')
   }



    return (
        <div className="app">
    
        <Header/>
       
       <h1>Faktury</h1>
       <section className="topButtons">
       <button onClick={handleMenu}>Powrót do menu</button> <button onClick={handleLogOut}>Wyloguj się</button>
       </section>

        {invoices.map(invoice => (
         <div key={invoice._id} className="myOrdersItem">
           <h1>Data wystawienia: {invoice.date}</h1>
           <h2>Kwota zamówienia: {invoice.amount} PLN</h2>
           <h4>Imię i nazwisko klienta: {invoice.customername} {invoice.customersurname}</h4>
           <h4>Nazwa firmy: {invoice.customercompanyname}</h4>
           <h4>Adres firmy: {invoice.customercompanystreet} {invoice.customercompanypostcode} {invoice.customercompanycity}</h4>
           <h4>E-mail: {invoice.customeremail}</h4>
           
           <h4>Nr telefonu: {invoice.customerphonenumber}</h4>
           <h4>NIP: {invoice.customercompanynip}</h4>
           <h4>REGON: {invoice.customercompanyregon}</h4>
           <button className="showInvoice" onClick={() => showInvoice(invoice._id, invoice.customername, invoice.customersurname, invoice.customercompanyname, invoice.customercompanystreet, invoice.customercompanypostcode, invoice.customercompanycity, invoice.customeremail, invoice.customerphonenumber, invoice.customercompanynip, invoice.boughtProducts, invoice.date, invoice.amount)}>Pokaż fakturę</button>
          
           {/* Drugi map - lista produktów z tego zamówienia */}
           {invoice.boughtProducts.map(bp => (
             <div key={bp.id} className="boughtProductsInOrder"><div className="productThumbnail"><img src={`http://localhost:5000/${bp.imageurl}`}/></div><div className="productInfoOrder"><h3>{bp.productname}</h3><h3>Cena: {bp.price} PLN</h3></div></div>
           ))}
         </div>
       )).reverse()}

 
        

        <Footer/>
    </div>
    )
}

export default Invoices;