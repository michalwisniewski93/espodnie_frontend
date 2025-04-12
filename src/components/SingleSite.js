import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const SingleSite = () => {

    const navigate = useNavigate()


    const activeSiteName = useSelector(state => state.siteName)
    const activeSiteContent = useSelector(state => state.siteContent)

    



const handleAdmin = () => {
    navigate('/admin')
}

const handleNewAccount = () => {
    navigate('/new-account')
}


    return(
    <div className="app">
        
        <Header/>
        
        <section className="topButtons">
            <button onClick={handleNewAccount}>Załóż Nowe konto</button><button onClick={handleAdmin}>Panel admina</button>
        </section>
        <div className="singlesitecontent">
            <h1 className="singlesitename">{activeSiteName}</h1>
            <p className="singlesitecontent">{activeSiteContent}</p>

        </div>
       
        
        <Footer/>
    </div>
    )
}

export default SingleSite