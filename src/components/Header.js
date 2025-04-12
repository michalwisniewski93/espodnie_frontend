import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Header = () => {


    const [receivedData, setReceivedData] = useState([])


    useEffect(() => {
        axios.get('http://localhost:5000/shopdata')
        .then((response) => setReceivedData(response.data))
        .catch((err) => console.log('error fetching shop data, error: ' + err))
    })




    return(
        <>
        <header className="header">
      
        {receivedData.map(rd => <p className="header_title" key={rd._id}><a href="http://localhost:3000">{rd.shoptitle}</a></p>)}
        </header>
        
        </>
    )
}
export default Header;