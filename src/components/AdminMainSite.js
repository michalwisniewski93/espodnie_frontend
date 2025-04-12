import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

const AdminMainSite = () => {
const dispatch = useDispatch()
const [login, setLogin] = useState('')
const [password, setPassword] = useState('')
const [receivedData, setReceivedData] = useState([])
const [permission, setPermission] = useState(false)
const [visibilityLoginForm, setVisibilityLoginForm] = useState(true)





const [loginText, setLoginText] = useState('')
const [passwordText, setPasswordText] = useState('')


const [editingId, setEditingId] = useState(null)






useEffect(() => {
    axios.get('http://localhost:5000/login')
    .then((response) => setReceivedData(response.data))
    .catch((err) => console.log('Wystąpił bład podczas pobierania danych logowania, błąd: ' + err))
}, [])

const navigate = useNavigate()
const  handleSubmit = (e) => {
    e.preventDefault()
    receivedData.map(rd => {
        if(rd.login === login && rd.password === password){
            setPermission(true)
            const permission = true
           
            setLoginText(rd.login)
            setPasswordText(rd.password)
            setEditingId(rd._id)

             axios.put(`http://localhost:5000/login/${rd._id}`, {login, password, permission})
            .then((response) => {
                    setReceivedData(receivedData.map(rd => rd._id === rd._id ? response.data : rd));
                    
                   })
              .catch((err) => console.error("Error updating admin login:", err));


              navigate('/login')

              
              

           
        }
        else {

            setLogin('')
            setPassword('')
           
           
        }
  })
}


const handleHomeReturn = () => {
    navigate('/')
}



    return(
        <div className="app">
    
        <Header/>
       
       <div className="info">
        <p>Witaj w panelu administracyjnym. Login: admin Hasło: admin</p>
       </div>
        {true? <form onSubmit={handleSubmit}><label htmlFor="">Login:<input type="text" value={login} onChange={(e) => setLogin(e.target.value)} /></label><label htmlFor="">Hasło:<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><button>Zaloguj się</button></form>: null}
        <button className="returnToMainSite" onClick={handleHomeReturn}>Powrót na sklep</button>
        

        <Footer/>
    </div>
    )
}

export default AdminMainSite;