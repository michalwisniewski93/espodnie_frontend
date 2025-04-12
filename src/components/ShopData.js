import React, {useState, useEffect} from 'react'
import Header from './Header';
import Footer from './Footer';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


const ShopData = () => {


const navigate = useNavigate()


const [receivedData, setReceivedData] = useState([])
const [shopTitle, setShopTitle] = useState('')
const [companyName, setCompanyName] = useState('')
const [companyStreet, setCompanyStreet] = useState('')
const [companyPostCode, setCompanyPostCode] = useState('')
const [companyCity, setCompanyCity] = useState('')
const [companyNip, setCompanyNip] = useState('')
const [companyEmail, setCompanyEmail] = useState('')
const [companyPhoneNumber, setCompanyPhoneNumber] = useState('')
const [visibilityEditForm, setVisibilityEditForm] = useState(false)
const [editingId, setEditingId] = useState()

useEffect(() => {
    axios.get('http://localhost:5000/shopdata')
    .then((response) => setReceivedData(response.data))
    .catch((err) => console.log('error fetching shop data, error: ' + err))
}, [])

    const handleLogOut = () => {
        navigate('/admin')
    }

   const handleMenu = () => {
    navigate('/login')
   }



   const handleEdit = () => {
    setVisibilityEditForm(true)
    receivedData.map(rd => {
        setShopTitle(rd.shoptitle)
        setCompanyName(rd.companyname)
        setCompanyStreet(rd.companystreet)
        setCompanyPostCode(rd.companypostcode)
        setCompanyCity(rd.companycity)
        setCompanyNip(rd.companynip)
        setCompanyEmail(rd.companyemail)
        setCompanyPhoneNumber(rd.companyphonenumber)
        setEditingId(rd._id)
    })
   }


   const handleSave = () => {
    setVisibilityEditForm(false)

    const shoptitle = shopTitle
    const companyname = companyName
    const companystreet = companyStreet
    const companypostcode = companyPostCode
    const companycity = companyCity
    const companynip = companyNip
    const companyemail = companyEmail
    const companyphonenumber = companyPhoneNumber

    axios.put(`http://localhost:5000/shopdata/${editingId}`, {shoptitle, companyname, companystreet, companypostcode, companycity, companynip, companyemail, companyphonenumber})
   .then((response) => {
        setReceivedData(receivedData.map(rd => rd._id === editingId ? response.data : rd));
        setShopTitle('')
        setCompanyName('')
        setCompanyStreet('')
        setCompanyPostCode('')
        setCompanyCity('')
        setCompanyNip('')
        setCompanyEmail('')
        setCompanyPhoneNumber('')
          })
     .catch((err) => console.error("Error updating shop data:", err));
   }




    return (
        <div className="app">
    
        <Header/>
       
       <h1>Dane sklepu</h1>
       <section className="topButtons">
       <button onClick={handleMenu}>Powrót do menu</button> <button onClick={handleLogOut}>Wyloguj się</button>
       </section>


        <div className="editShopDataForm">
            {visibilityEditForm ? (
                <form>
                <label>
                    Tytuł sklepu:
                    <input type="text" value={shopTitle} onChange={(e) => setShopTitle(e.target.value)} />
                </label>
                <label>
                    Nazwa firmy:
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </label>
                <label>
                    Adres ulica:
                    <input type="text" value={companyStreet} onChange={(e) => setCompanyStreet(e.target.value)} />
                </label>
                <label>
                    Kod pocztowy:
                    <input type="text" value={companyPostCode} onChange={(e) => setCompanyPostCode(e.target.value)} />
                </label>
                <label>
                    Miejscowość:
                    <input type="text"  value={companyCity} onChange={(e) => setCompanyCity(e.target.value)}/>
                </label>
                <label>
                    NIP (10cyfr):
                    <input type="text" maxLength="10" value={companyNip} onChange={(e) => setCompanyNip(e.target.value)} />
                </label>
                <label>
                    Adres e-mail:
                    <input type="text" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)}/>
                </label>
                <label>
                    Numer telefonu:
                    <input type="text" value={companyPhoneNumber} onChange={(e) => setCompanyPhoneNumber(e.target.value)}/>
                </label>
                <button className="save" onClick={handleSave}>Zapisz</button>
            </form>
            ) : null}
            
        </div>

       <div className="shopData">
        {receivedData.map(rd => (
            <div key={rd._id}>
                <p className="shoptitle"><span className="property">Tytuł sklepu:</span> {rd.shoptitle}</p>
                <p className="companyname"><span className="property">Nazwa firmy:</span> {rd.companyname}</p>
                <p className="companystreet"><span className="property">Adres ulica:</span> {rd.companystreet}</p>
                <p className="companypostcode"><span className="property">Kod pocztowy:</span> {rd.companypostcode}</p>
                <p className="companycity"><span className="property">Miejscowość:</span> {rd.companycity}</p>
                <p className="companynip"><span className="property">NIP:</span> {rd.companynip}</p>
                <p className="companyemail"><span className="property">Adres e-mail:</span> {rd.companyemail}</p>
                <p className="companyphonenumber"><span className="property">Numer telefonu:</span> {rd.companyphonenumber}</p>
                <button className="editShopData" onClick={handleEdit}>Edytuj dane sklepu</button>
            </div>
        ))}
        
        
       </div>

 
        

        <Footer/>
    </div>
    )
}

export default ShopData;