import React, {useState, useEffect} from 'react'
import Header from './Header';
import Footer from './Footer';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


const Subsites= () => {

const [sites, setSites] = useState([])
const [visibilityAddSitesForm, setVisibilityAddSitesForm] = useState(false)
const [name, setName] = useState('')
const [content, setContent] = useState('')
const [url, setUrl] = useState('')
const [editingName, setEditingName] = useState('')
const [editingContent, setEditingContent] = useState('')
const [editingUrl, setEditingUrl] = useState('')
const [editingId, setEditingId] = useState('')
const [visibilityEditSiteForm, setVisibilityEditSiteForm] = useState(false)




const navigate = useNavigate()

    const handleLogOut = () => {
       
        
        
        navigate('/admin')
        
        
        
        }

   const handleMenu = () => {
    navigate('/login')
   }


   useEffect(() => {
    axios.get('http://localhost:5000/sites')
    .then((response) => setSites(response.data))
    .catch((err) => console.log('error fetching sites, error: ' + err))
   }, [])


   const handleEdit = (id, name, content, url) => {
    setVisibilityEditSiteForm(!visibilityEditSiteForm)
    setEditingName(name)
    setEditingContent(content)
    setEditingUrl(url)
    setEditingId(id)
    
   }

   const handleDelete = (id) => {
     axios.delete(`http://localhost:5000/sites/${id}`)
          .then(() => setSites(sites.filter(site => site._id !== id)))
          .catch((err) => console.error("Error deleting site:", err));
   }

   const handleAddSite = () => {
    setVisibilityAddSitesForm(!visibilityAddSitesForm)
   }

   const handleAddNewSite = () => {
    setVisibilityAddSitesForm(!visibilityAddSitesForm)

  

    //post 
     axios.post("http://localhost:5000/sites", {name, content, url})
                .then((response => setSites([...sites, response.data])))
                .catch(err => {
                    console.error('Error adding sites', err)
                    alert('uuups ... coś poszło nie tak!')
                })

    setName('')
    setContent('')
    setUrl('')

   }

   const handleEditSite = (e) => {
    e.preventDefault()
    const name = editingName
    const content = editingContent
    const url = editingUrl
    const id = editingId

    // tu będie put

    axios.put(`http://localhost:5000/sites/${id}`, {name, content, url})
       .then((response) => {
            setSites(sites.map(site => site._id === id ? response.data : site));
            
              })
         .catch((err) => console.error("Error updating site:", err));

    setVisibilityEditSiteForm(!visibilityEditSiteForm)
   }


    return (
        <div className="app">
    
        <Header/>
       
       <h1>Podstrony - ({sites.length})</h1>
       <section className="topButtons">
       <button onClick={handleAddSite}>Dodaj podstronę</button><button onClick={handleMenu}>Powrót do menu</button> <button onClick={handleLogOut}>Wyloguj się</button>
       </section>
       <div className="editSiteForm">
       {visibilityEditSiteForm ? (<div>
            <form>
            <label>nazwa podstrony:
                <input type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)}/>
            </label>
            <label>treść podstrony:
                <input type="text" value={editingContent} onChange={(e) => setEditingContent(e.target.value)}/>
            </label>
            <label>URL podstrony:
                <input type="text" value={editingUrl} onChange={(e) => setEditingUrl(e.target.value)}/>
            </label>
            <button onClick={handleEditSite}>Zedytuj</button>
        </form>
        </div>) : null}
       </div>
       <div className="addSiteForm">
        {visibilityAddSitesForm ? (<div>
            <form>
            <label>nazwa podstrony:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>treść podstrony:
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
            </label>
            <label>URL podstrony:
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}/>
            </label>
            <button onClick={handleAddNewSite}>Dodaj</button>
        </form>
        </div>) : null}
        
       </div>
       <div className="sites">
        {sites.map(site => (
            <div className="singleSite" key={site._id}>
                <p><span className="property">nazwa podstrony:</span> {site.name}</p>
                <p><span className="property">treść podstrony:</span> {site.content}</p>
                <p><span className="property">URL podstrony:</span> {site.url}</p>
                <button onClick={() => handleEdit(site._id, site.name, site.content, site.url)}>Edytuj</button><button onClick={(e) => handleDelete(site._id)}>Usuń</button>
            </div>
            ))}
       </div>

 
        

        <Footer/>
    </div>
    )
}

export default Subsites;