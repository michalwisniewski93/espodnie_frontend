import React, {useEffect, useState} from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import Header from './Header'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Basket = () => {

     const isUserLogged = useSelector(state => state.isUserLogged)
     const productsNumber = useSelector(state => state.boughtProducts.length)

     const boughtProducts = useSelector(state => state.boughtProducts )
     const [amount, setAmount] = useState(0)
     const customerData = useSelector(state => state.customerData)

     const [orders, setOrders] = useState([])
     const [totalAmount, setTotalAmount] = useState([])
     const navigate = useNavigate()


     useEffect(() => {
             const total = boughtProducts.reduce((sum, product) => sum + product.price, 0);
             setAmount(total); 
             setTotalAmount(total)
           }, [boughtProducts]);


           const formatDateWithDay = (date) => {
            const pad = (n) => n.toString().padStart(2, '0');
            const days = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
          
            const dayName = days[date.getDay()];
            const day = pad(date.getDate());
            const month = pad(date.getMonth() + 1);
            const year = date.getFullYear();
            const hours = pad(date.getHours());
            const minutes = pad(date.getMinutes());
            const seconds = pad(date.getSeconds());
          
            return `${dayName}, ${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
          };




    const handleCreateOrder = (name, surname, street, postcode, city, companyname, companystreet, companypostcode, companycity, email, invoice, login, newsletter, password, phonenumber, regulations, companynip, companyregon, boughtProducts, totalAmount ) => {
        const customername = name
        const customersurname = surname
        const customerstreet = street
        const customerpostcode = postcode
        const customercity = city
        const customercompanyname = companyname
        const customercompanystreet = companystreet
        const customercompanypostcode = companypostcode
        const customercompanycity = companycity
        const customeremail = email
        const customerinvoice = invoice
        const customerlogin = login
        const customernewsletter = newsletter
        const customerpassword = password
        const customerphonenumber = phonenumber
        const customerregulations = regulations
        const customercompanynip = companynip
        const customercompanyregon = companyregon

        


        const date = formatDateWithDay(new Date())

        const amount = totalAmount

        
        
        axios.post("http://localhost:5000/orders", {customername, customersurname, customerstreet, customerpostcode, customercity, customercompanyname, customercompanystreet, customercompanypostcode, customercompanycity, customeremail, customerinvoice, customerlogin, customernewsletter, customerpassword, customerphonenumber, customerregulations, customercompanynip, customercompanyregon, boughtProducts, date, amount})
        .then((response => setOrders([...orders, response.data])))
        .catch(err => console.error('Error adding orders', err))
        navigate('/order-completed')
        

    }
    return (
        <div className="app">
          
             <Header/>
             <h1>Koszyk <FaShoppingCart size={24} color="#333" /></h1>
             <div className="productsInBasketPresentation">
             {isUserLogged ? boughtProducts.map(boughtProduct => (<div className="productInBasketItem" key={boughtProduct.id}>
                <div className="productImageThumbnail"><img src={`http://localhost:5000${boughtProduct.imageurl}`} alt={boughtProduct.productname}/></div>
                <div className="productData">
                <h3>{boughtProduct.productname}</h3>
                <h4>cena: {boughtProduct.price} PLN</h4>
                
                {boughtProduct.storepieces > 0 ? <span className="availableInBasket">Dostępny</span> : <span className="outOfStockInBasket">Niedostępny na magazynie</span>}
                </div>
                <div className="productDelete">
                    <button title="Usuń produkt z koszyka">X</button>
                </div>


             </div>)): <span>Nie jesteś zalogowany, przejdź do <Link to="/">strony głównej</Link>, by się zalogować.</span> }
             </div>
             <div className="amountPresentation">
                <p className="amount">Razem do zapłaty: {amount} PLN </p>
            
                <button className="order" onClick={() => handleCreateOrder(customerData.name, customerData.surname, customerData.street, customerData.postcode, customerData.city, customerData.companyname, customerData.companystreet, customerData.companypostcode, customerData.companycity, customerData.email, customerData.invoice, customerData.login, customerData.newsletter, customerData.password, customerData.phonenumber, customerData.regulations, customerData.companynip, customerData.companyregon, boughtProducts, totalAmount)}>Zamów</button>
             </div>
        </div>
       
    )
}

export default Basket;