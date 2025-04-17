import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'

const LogInUser = () => {


    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [customers, setCustomers] = useState([])

    const [saveUser, setSaveUser] = useState('')
    const [favouritesList, setFavouritesList] = useState([])
    const [documentId, setDocumentId] = useState('')


useEffect(() => {
    axios.get('http://localhost:5000/customers')
    .then((response) => setCustomers(response.data))
    .catch((err) => console.log('error fetching customers, error: ' + err))
}, [])

const handleCreateNewAccount = () => {
    navigate('/new-account')
}

const dispatch = useDispatch()

const changeIsUserLogged = () => dispatch({type: 'CHANGE_IS_USER_LOGGED'})

const setUserInStore = (user) => dispatch({type: 'SET_USER_IN_STORE', user})
const setPasswordInStore = (pass) => dispatch({type: 'SET_PASSWORD_IN_STORE', pass})


const setFavouritesId = (favouritesId) => dispatch({type: 'SET_FAVOURITES_ID', favouritesId})
const setBoughtProductsId = (boughtProductsId) => dispatch({type: 'SET_BOUGHT_PRODUCTS_ID', boughtProductsId})
const setCustomerData = (customerData) => dispatch({type: 'SET_CUSTOMER_DATA', customerData})

const handleLogIn = (e) => {
    e.preventDefault()

    const found = customers.find(customer => 
        customer.login === login && customer.password === password
    );
    
    if (found) {
        alert('zalogowano pomyślnie');
        changeIsUserLogged()
        setUserInStore(login)
        setSaveUser(login)
        setPasswordInStore(password)

        const object = {
            id: found._id,
            name: found.name,
            surname: found.surname,
            street: found.street,
            postcode: found.postcode, 
            city: found.city, 
            companyname: found.companyname, 
            companystreet: found.companystreet,
            companypostcode: found.companypostcode, 
            companycity: found.companycity,
            email: found.email, 
            invoice: found.invoice, 
            login: found.login, 
            newsletter: found.newsletter, 
            password: found.password, 
            phonenumber: found.phonenumber,
            regulations: found.regulations, 
            companynip: found.companynip, 
            companyregon: found.companyregon,
         }
        setCustomerData(object)
        


        axios.get('http://localhost:5000/favourites')
  .then(response => {
    const allFavourites = response.data;
   
    const filteredFavourites = allFavourites.filter(fav => fav.user === login);
   

    setFavouritesList(filteredFavourites);

    const searchingId = filteredFavourites[0]._id;
    setDocumentId (searchingId)
    const favouritesId = searchingId
    setFavouritesId(favouritesId)
    
  

  })
  .catch((err) => console.log('error fetching favourites, error:' + err));



  axios.get('http://localhost:5000/baskets')
  .then(response => {
    const allBaskets = response.data;
   
    const filteredBaskets = allBaskets.filter(b => b.user === login);
   

   

    const searchingId = filteredBaskets[0]._id;
   
    const boughtProductsId = searchingId
    setBoughtProductsId(boughtProductsId)
    
  

  })
  .catch((err) => console.log('error fetching baskets, error:' + err));

 






    } else {
        alert('błędne dane logowania');
    }

    

    setLogin('')
    setPassword('')

   
}

    const navigate = useNavigate()
    return(
    <div className="logInUser">
        <div className="info">Przykładowo założony profil: Login: user, Hasło: user. Jeżeli chcesz przetestować aplikację możesz założyć swój nowy profil a następnie zalogować się podanymi danymi, lub użyć tego gotowego.</div>
        <h1>Zaloguj się</h1>
        <form>
            <label>Login:<input type="text" value={login} onChange={(e) => setLogin(e.target.value)}/></label>
            <label>Hasło:<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></label>
            <button onClick={handleLogIn}>Zaloguj się</button>
        </form>
        <h2>Nie masz konta? Zarejestruj się</h2>
        <button className="createNewAccount" onClick={handleCreateNewAccount}>Załóż nowe konto</button>

       
    </div>)
}

export default LogInUser