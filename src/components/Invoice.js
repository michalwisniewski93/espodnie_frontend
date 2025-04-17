import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

const Invoice = () => {

    const navigate = useNavigate()


    const invoicePresentationNumber = useSelector(state => state.invoicePresentationNumber)
    const invoicePresentationFirstLineOfCustomer = useSelector(state => state.invoicePresentationFirstLineOfCustomer)
    const invoicePresentationNipOfCustomer = useSelector(state => state.invoicePresentationNipOfCustomer)
    const invoicePresentationPhoneNumberOfCustomer = useSelector(state => state.invoicePresentationPhoneNumberOfCustomer)
    const invoicePresentationEmailAddressOfCustomer = useSelector(state => state.invoicePresentationEmailAddressOfCustomer)
    const invoicePresentationBoughtProducts = useSelector(state => state.invoicePresentationBoughtProducts)
    const invoicePresentationTotalAmount = useSelector(state => state.invoicePresentationTotalAmount)
    const invoicePresentationDateOfIssue = useSelector(state => state.invoicePresentationDateOfIssue)

    const [shopData, setShopData] = useState([])
    const handleReturnToInvoicesList = () => {
        navigate('/invoices')
    }


    useEffect(() => {
        axios.get('http://localhost:5000/shopdata')
        .then((response) => setShopData(response.data))
        .catch((err) => console.log('error fetching shop data, error: ' + err))
    }, [])
    return(
        <>
        <h1>Faktura</h1>
        <button className="returnToInvoicesList" onClick={handleReturnToInvoicesList}>Powróć do listy faktur</button>
        <div className="invoiceTemplate">
            <h1>Faktura VAT</h1>
            <h3>Numer: {invoicePresentationNumber}</h3>
            <h3>Data sprzedaży: {invoicePresentationDateOfIssue}</h3>
            <div className="sellerAndCustomer">
            <div className="seller">
                <h3>Sprzedawca:</h3>
                {shopData.map(dataItem => (<div>
                    <h5>{dataItem.companyname} , ul. {dataItem.companystreet} {dataItem.companypostcode} {dataItem.companycity}</h5>
                <h5>NIP: {dataItem.companynip}</h5>
                <h5>Nr telefonu: {dataItem.companyphonenumber}</h5>
                <h5>Adres e-mail: {dataItem.companyemail}</h5>
                </div>))}
               
            </div>
            <div className="customer">
                <h3>Nabywca:</h3>
                <h5>{invoicePresentationFirstLineOfCustomer}</h5>
                <h5>NIP: {invoicePresentationNipOfCustomer}</h5>
                <h5>Nr telefonu: {invoicePresentationPhoneNumberOfCustomer}</h5>
                <h5>Adres e-mail: {invoicePresentationEmailAddressOfCustomer}</h5>
            </div>
            </div>
            <div className="wayOfPayment">
                <p>Sposób zapłaty: gotówka lub przelew</p>
            </div>
            <h2>Zakupione produkty</h2>
            <div className="boughtProductsAtInvoice">
            {invoicePresentationBoughtProducts.map(invoice => (
                <div className="productItemAtInvoice">
                <div className="productThumbnailAtInvoice"><img src={`http://localhost:5000/${invoice.imageurl}`}/></div>
                <div className="productInfoAtInvoice">
                    <h4>{invoice.productname}</h4>
                    <h5>Cena brutto: {invoice.price.toFixed(2)} zł</h5>
                    <h6>Netto: {(invoice.price/1.23).toFixed(2)} zł </h6>
                    <h6>VAT: {(0.23*(invoice.price/1.23)).toFixed(2)} zł</h6>
                    

                </div>
            </div>
            ))}
                
            </div>
            <h2>Razem do zapłaty: {invoicePresentationTotalAmount} zł</h2>
            <h3>Netto: {(invoicePresentationTotalAmount/1.23).toFixed(2)} zł</h3>
            <h3>W tym VAT: {(0.23*(invoicePresentationTotalAmount/1.23)).toFixed(2)} zł</h3>
            
        </div>

        </>
    )
}

export default Invoice