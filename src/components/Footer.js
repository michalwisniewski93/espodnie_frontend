import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'



const Footer =  () => {
const [receivedData, setReceivedData] = useState([])
const [productCategories, setProductCategories] = useState([])
const [sites, setSites] = useState([])

const activeCategory = useSelector(state => state.activeCategory)

const dispatch = useDispatch()

const changeActiveCategory = (activeCategory) => dispatch({type: 'CHANGE_ACTIVE_CATEGORY', activeCategory})
const changeActiveSiteName = (sitename) => dispatch({type: 'CHANGE_ACTIVE_SITE_NAME', sitename})
const changeActiveSiteContent = (content) => dispatch({type: 'CHANGE_ACTIVE_SITE_CONTENT', content})

const navigate = useNavigate()

useEffect(() => {
    axios.get('http://localhost:5000/shopdata')
    .then((response) => setReceivedData(response.data))
    .catch((err) => console.log('error fetching shop data, error: ' + err))

    axios.get('http://localhost:5000/productcategories')
    .then((response) => setProductCategories(response.data))
    .catch((err) => console.log('error fetching product categories, error: ' + err))

    axios.get('http://localhost:5000/sites')
    .then((response) => setSites(response.data))
    .catch((err) => console.log('error fetching sites, error: ' + err))
}, [])


const handleSetActiveCategory = (name) => {
    const activeCategory = name
    changeActiveCategory(activeCategory)
    navigate('/')
}

const handleClick = (sitename, content, url) => {

    changeActiveSiteName(sitename)
    changeActiveSiteContent(content)
}

    return (
        <footer className="footer">
            <div className="footer__shopdata">
            {receivedData.map(rd => (
    <div key={rd._id}>
        <h1 className="companyData">Dane firmy</h1>
        <p className="companyName">{rd.companyname}</p>
        <p className="companyStreet">{rd.companystreet}</p>
        <p className="companyPostCodeandCity">{rd.companypostcode} {rd.companycity}</p>
        <p className="companynip">NIP: {rd.companynip}</p>
        <p className="companyemail">e-mail: {rd.companyemail}</p>
        <p className="companyphone">tel. {rd.companyphonenumber}</p>
    </div>
))}
            </div>
            <div className="footer__categories">
                <h1 className="shopCategories">Kategorie produktów</h1>
                    <nav>
                        <ul>
                            {productCategories.map(category => <li key={category._id}><button onClick={() => handleSetActiveCategory(category.name)}>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</button></li>)}
                           
                        </ul>
                    </nav>
                
            </div>
            <div className="footer__sites">
                <h1 className="sites">Podstrony</h1>
                <nav>
                    <ul>
                        {sites.map(site => <li key={site._id}><Link onClick={ () => handleClick(site.name.charAt(0).toUpperCase() + site.name.slice(1), site.content.charAt(0).toUpperCase() + site.content.slice(1), site.url)} to="/site">{site.name.charAt(0).toUpperCase() + site.name.slice(1)}</Link></li>)}
                       
                    </ul>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;