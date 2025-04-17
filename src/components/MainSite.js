import React, {useEffect, useState} from 'react'
import Header from './Header'
import Footer from './Footer'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import LogInUser from './LogInUser'
import { FaHeart } from 'react-icons/fa';


const MainSite = () => {

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
    const addToFavourites = (newFavourites) => dispatch({type: 'ADD_TO_FAVOURITES_LIST', newFavourites})

    const userLogged = useSelector(state => state.user);


    

    const favouritesId = useSelector(state => state.favouritesId)
    const boughtProductsId = useSelector(state => state.boughtProductsId)

    const [allFavourites, setAllFavourites] = useState([])
    const [favourites, setFavourites] = useState([])

    const id = useSelector(state => state.favouritesId)

    

   

    const favouritesFromStore = useSelector(state => state.favouritesList)

    const boughtProductsFromStore = useSelector(state => state.boughtProducts)

    const addToBoughtProducts = (boughtProducts) => dispatch({type: 'ADD_TO_BOUGHT_PRODUCTS', boughtProducts})


useEffect(() => {
    if(activeCategory !== ''){
        setSelectedCategory(activeCategory)
        
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
    .then(response => {
        setAllFavourites(response.data)
        console.log(allFavourites)
        
       
        
        
    })
    .catch(err => console.log('error fetching all favourites, error: ' + err))

 
    
}, [])













const handleBuyNow = (productname, imageurl, description, price, storepieces) => {
    if(isUserLogged === false){
    alert('Nie jesteś zalogowany, zaloguj się aby móc kupować na sklepie.')
    return
    }
    const addingObject = {
        id: new Date(),
        productname, 
        imageurl,
        description,
        price,
        storepieces
    }

    addToBoughtProducts(addingObject)


    const boughtProducts = boughtProductsFromStore
 

   
    // tu będzie axios put

    const user = userLogged
    
    axios.put(`http://localhost:5000/baskets/${boughtProductsId}`, {user, boughtProducts })
    .then((response) => console.log('dodano poprawnie'))
    .catch((err) => console.log('error updating baskets ' + err))
  
  }


const handleAddToFavourites = (productname, imageurl, description, price, storepieces) => {
    if(isUserLogged === false){
    alert('Nie jesteś zalogowany, zaloguj się by móc dodawać produkty do ulubionych.')
    return
    }
    const addingObject = {
        productname,
        imageurl,
        description, 
        price,
        storepieces
    }
addToFavourites(addingObject)
  


  

const favourites = favouritesFromStore

   
    // tu będzie axios put

    const user = userLogged
    
    axios.put(`http://localhost:5000/favourites/${favouritesId}`, {user, favourites })
    .then((response) => console.log('dodano poprawnie'))
    .catch((err) => console.log('error updating favourites ' + err))
  
}




const handleSiteClick = (sitename, content, url) => {
    changeActiveSiteName(sitename)
    changeActiveSiteContent(content)
}

const handleDisplayFavourites = () => {
    navigate('/favourites')
}

const handleShowOrders = () => {
    navigate('/my-orders')
}


const filtredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;

    return(
    <div className="app">
        
        <Header/>
        <div className="mainMenu">
            <nav>
                <ul>
                    <button onClick={() => setSelectedCategory('')}>Start</button>
                    {productCategories.map(category => <button key={category._id} onClick={() => setSelectedCategory(category.name)}>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</button>
                    )}
                    
                    {sites.map(site => <Link key={site._id} onClick={ () => handleSiteClick(site.name.charAt(0).toUpperCase() + site.name.slice(1), site.content.charAt(0).toUpperCase() + site.content.slice(1), site.url)} to="/site">{site.name.charAt(0).toUpperCase() + site.name.slice(1)}</Link>)}
                       
                </ul>
            </nav>
        </div>
        <section className="topButtons">
            {isUserLogged? <div><span>Zalogowano jako: {userLogged}</span><button onClick={handleDisplayFavourites}><FaHeart size={10} color="red" /> Ulubione</button><button onClick={handleShowOrders}>Zamówienia</button></div> : null }
            <button onClick={handleLogIn}>{isUserLogged ? 'Wyloguj się' : 'Zaloguj się'}</button><button onClick={handleNewAccount}>Załóż Nowe konto</button><button onClick={handleAdmin}>Panel admina</button>
        </section>
        {visibleLoginForm && !isUserLogged ? <LogInUser/> : null}
        <div className="productsPresentationList">
            {filtredProducts.map(product => (<div className="productCard" key={product._id}>
                <h2 className="productName">{product.productname}</h2>
                <img src={`http://localhost:5000${product.imageurl}`} alt={product.productname}/>
                <h6 className="productDescription">{product.description}</h6>
                <h6 className="productPrice">{product.price} PLN</h6>
                <h6 className="productStorePieces">{product.storepieces > 0 ? <span className="available">Dostępny</span> : <span className="outOfStock">Wyprzedany</span>}</h6>
                <button className="buyNow" onClick={() => handleBuyNow(product.productname, product.imageurl, product.description, product.price, product.storepieces)}>Kup teraz</button>
                <button className="addToFavourites" onClick={() => handleAddToFavourites(product.productname, product.imageurl, product.description, product.price, product.storepieces)}>Dodaj do ulubionych</button>

            </div>)

            )}
        </div>
       
        
        <Footer/>
    </div>
    )
}

export default MainSite