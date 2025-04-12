import React, {useEffect, useState} from 'react'
import Header from './Header'
import Footer from './Footer'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import LogInUser from './LogInUser'


const Favourites = () => {

    const [products, setProducts] = useState([])
    const [productCategories, setProductCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [visibleLoginForm, setVisibleLoginForm] = useState(false)


    const activeCategory = useSelector(state => state.activeCategory)


    const [sites, setSites] = useState([])

    const dispatch = useDispatch()

    const changeActiveSiteName = (sitename) => dispatch({type: 'CHANGE_ACTIVE_SITE_NAME', sitename})
    const changeActiveSiteContent = (content) => dispatch({type: 'CHANGE_ACTIVE_SITE_CONTENT', content})

    const navigate = useNavigate()

    const isUserLogged = useSelector(state => state.isUserLogged)

    const [isLogged, setisLogged] = useState(isUserLogged)

    
    
    const changeIsUserLogged = () => dispatch({type: 'CHANGE_IS_USER_LOGGED'})

    const setUserInStore = (user) => dispatch({type: 'SET_USER_IN_STORE', user})
    const setPasswordInStore = (pass) => dispatch({type: 'SET_PASSWORD_IN_STORE', pass})

    const userLogged = useSelector(state => state.user);

    const [favourites, setFavourites] = useState([])

    const id = useSelector(state => state.favouritesId)


useEffect(() => {
    if(activeCategory !== ''){
        setSelectedCategory(activeCategory)
        console.log(selectedCategory)
    }
}, [activeCategory])

const handleAdmin = () => {
    navigate('/admin')
}

const handleNewAccount = () => {
    navigate('/new-account')
   
}


const handleLogIn = () => {
    setVisibleLoginForm(!visibleLoginForm)
    if(!isUserLogged){
        setVisibleLoginForm(!visibleLoginForm)
    }
    if(isUserLogged){
        
        changeIsUserLogged()
        setUserInStore('')
        setPasswordInStore('')
    }
}

useEffect(() => {
    axios.get('http://localhost:5000/products')
    .then((response) => setProducts(response.data))
    .catch((err) => console.log('error fetching products, error: ' + err))

    axios.get('http://localhost:5000/productcategories')
    .then((response) => setProductCategories(response.data))
    .catch((err) => console.log('error fetching product categories, error: ' + err))

    axios.get('http://localhost:5000/sites')
    .then((response) => setSites(response.data))
    .catch((err) => console.log('error fetching sites, error: ' + err))

}, [])


useEffect(() => {
    axios.get('http://localhost:5000/favourites')
    .then((response) => setFavourites(response.data))
    .catch((err) => console.log('error fetching favourites, error: ' + err))
   
}, [])






const handleBuyNow = () => {
    if(isUserLogged === false){
    alert('Nie jesteś zalogowany, zaloguj się aby móc kupować na sklepie.')
    }
}


const handleSiteClick = (sitename, content, url) => {
    changeActiveSiteName(sitename)
    changeActiveSiteContent(content)
}

const handleDisplayMainSite = () => {
    navigate('/')
}


const filtredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products



    return(
    <div className="app">
        
        <Header/>
        
        <section className="topButtons">
            {isUserLogged? <div><span>Zalogowano jako: {userLogged}</span><button onClick={handleDisplayMainSite}>Strona główna</button><button>Zamówienia</button></div> : null }
            <button onClick={handleLogIn}>{isUserLogged ? 'Wyloguj się' : 'Zaloguj się'}</button><button onClick={handleNewAccount}>Załóż Nowe konto</button><button onClick={handleAdmin}>Panel admina</button>
        </section>
        {visibleLoginForm && !isUserLogged ? <LogInUser/> : null}

      
        {isUserLogged ? <h1>Ulubione</h1>: null }
        <div className="productsPresentationList">
            
        

        {favourites.filter(fv => fv._id === id).map(favourite => 
         favourite.favourites.map((fav, index) =>  <div className="productCard" key={index}><h2 className="productName">{fav.productname}</h2><img src={`http://localhost:5000${fav.imageurl}`} alt={fav.imageurl}/><h6 className="productDescription">{fav.description}</h6><h6 className="productPrice">{fav.price} PLN</h6><h6 className="productStorePieces">{fav.storepieces > 0 ? <span className="available">Dostępny</span> : <span className="outOfStock">Wyprzedany</span>}</h6><button className="buyNow" onClick={handleBuyNow}>Kup teraz</button></div>)
        )}

       








           

        </div>
       
        
        <Footer/>
    </div>
    )
}

export default Favourites