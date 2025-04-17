import React, {useState} from 'react'
import Header from './Header'
import Footer from './Footer'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'






const AddNewAccount = () => {

    const [visibilityCompanyFieldsInForm, setVisibilityCompanyFieldsInForm] = useState(false)
    //user
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [street, setStreet] = useState('')
    const [postcode, setPostCode] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [invoice, setInvoice] = useState(false)
    const [login, setLogin] = useState('')
    const [newsletter, setNewsletter] = useState(false)
    const [password, setPassword] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [regulations, setRegulations] = useState(false)
    //company
    const [companyname, setCompanyName] = useState('')
    const [companystreet, setCompanyStreet] = useState('')
    const [companypostcode, setCompanyPostCode] = useState('')
    const [companycity, setCompanyCity] = useState('')
    const [companyNip, setCompanyNip] = useState('')
    const [companyRegon, setCompanyRegon] = useState('')
    const [customers, setCustomers] = useState([])

    const [favourites, setFavourites] = useState([])
    const [baskets, setBaskets] = useState([])


  







    const navigate = useNavigate()

const handleAdmin = () => {
    navigate('/admin')
}


const handleWantInvoice = () => {
    setVisibilityCompanyFieldsInForm(prevState => !prevState)
}



const handleSubmit = (e) => {
    e.preventDefault()
    if(name === '' || surname === '' || street === '' || postcode === '' || city === '' || email === '' || invoice === '' || login === '' || password === '' || phonenumber === '')
    {
        alert('wszystkie pola formularza muszą być wypełnione')
        return
    }
    if(regulations === false){
        alert ('nie zaakceptowałeś regulaminu')
        return 
    }

    let companynip = companyNip
    let companyregon = companyRegon

    if(!companyname === '' || !companystreet === '' || !companypostcode === '' || !companycity === '' ||  isNaN(companyNip) || isNaN(companyRegon))
    {
      
        setCompanyName(null)
        setCompanyStreet(null)
        setCompanyPostCode(null)
        setCompanyCity(null)
        setCompanyNip(null)
        setCompanyRegon(null)
    }
    
    axios.post("http://localhost:5000/customers", {name, surname, street, postcode, city, companyname, companystreet, companypostcode, companycity, email, invoice, login, newsletter, password, phonenumber, regulations, companynip, companyregon})
        .then((response => setCustomers([...customers, response.data])))
        .catch(err => {
            console.error('Error adding customers', err)
            alert('uuups ... coś poszło nie tak!')
        })

    const favourites = []
    const user = login
    const boughtProducts = []

    console.log(user)
    console.log(favourites)

    axios.post('http://localhost:5000/favourites', {user, favourites})
    .then((response => setFavourites([...favourites, response.data])))
    .catch(err => {
            console.error('Error adding favourites', err)
            alert('uuups ... coś poszło nie tak!')
        })


        axios.post('http://localhost:5000/baskets', {user, boughtProducts})
        .then((response => setBaskets([...baskets, response.data])))
        .catch(err => {
                console.error('Error adding baskets', err)
                alert('uuups ... coś poszło nie tak!')
            })
  
    

    
    alert('założyłeś konto pomyślnie')


    setName('')
    setSurname('')
    setStreet('')
    setPostCode('')
    setCity('')
    setEmail('')
    setInvoice(false)
    setLogin('')
    setNewsletter(false)
    setPassword('')
    setPhoneNumber('')
    setRegulations(false)  
    setCompanyName('')
    setCompanyStreet('')
    setCompanyPostCode('')
    setCompanyCity('')
    setCompanyNip('')
    setCompanyRegon('')


}


    return(
    <div className="app">
    
        <Header/>
        <section className="topButtons">
            <button>Zaloguj się</button><button onClick={handleAdmin}>Panel admina</button>
        </section>
        <h1>Załóż nowe konto</h1>
        <form className="setNewAccount" onSubmit={handleSubmit}>
            <div>
            <label>
                Imię:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Nazwisko:
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>
            </label>
            <label>
                Login:
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
            </label>
            <label>
                Hasło:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>

            <label>
                Nr telefonu:
                <input type="text"  value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            </label>
            </div>
            <div>
            <label>
                Adres (ulica):
                <input type="text"  value={street} onChange={(e) => setStreet(e.target.value)}/>
            </label>
            <label>
                Kod pocztowy:<span className="additionalInfo">(5 cyfr,  format: 85790)</span>
                <input type="text" maxLength="5" minLength="5" value={postcode} onChange={(e) => setPostCode(e.target.value)} />
            </label>
            <label>
                Miejscowość:
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
            </label>
            <label>
                E-mail:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Czy chcesz fakturę:
                <input type="checkbox" value={invoice} onChange={(e) => {
                    setInvoice(e.target.checked)
                }} />
            </label>
            </div>
            {invoice ? (
               <div>
 <label>
                Nazwa firmy (opcjonalnie):
                <input type="text" value={companyname} onChange={(e) => setCompanyName(e.target.value)} />
            </label>
            <label>
                Adres firmy (ulica):
                <input type="text"  value={companystreet} onChange={(e) => setCompanyStreet(e.target.value)}/>
            </label>
            <label>
                Kod pocztowy firmy:
                <input type="text"  minLength="5" maxLength="5" value={companypostcode} onChange={(e) => setCompanyPostCode(e.target.value)}/>
            </label>
            <label>
                Miejscowość firmy:
                <input type="text"  value={companycity} onChange={(e) => setCompanyCity(e.target.value)}/>
            </label>
           
            <label>
                NIP (10 cyfr):
                <input type="text" maxLength="10" minLength="10" value={companyNip} onChange={(e) => setCompanyNip(e.target.value)} />
            </label>
            <label>
                REGON (9 cyfr):
                <input type="text" maxLength="9" minLength="9" value={companyRegon} onChange={(e) => setCompanyRegon(e.target.value)}/>
            </label>
               </div>
            ): null}
           <div>
            <label>
                Newsletter:
                <input type="checkbox" value={newsletter} onChange={(e) => setNewsletter(e.target.checked)}/>
            </label>
            <label>
                Akceptacja regulaminu sklepu:
                <input type="checkbox"  value={regulations} onChange={(e) => setRegulations(e.target.checked)}/>
            </label>
            <button>Załóż konto</button>
           </div>
        </form>
        <Footer/>
    </div>
    )
}

export default AddNewAccount