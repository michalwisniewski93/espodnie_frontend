import React, {useEffect, useState} from 'react'
import Header from './Header';
import Footer from './Footer';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const ProductCategories = () => {


const navigate = useNavigate()


const [productCategories, setProductCategories] = useState([])
const [newProductCategory, setNewProductCategory] = useState('')
const [visibilityEditForm, setVisibilityEditForm] = useState(false)
const [editingCategory, setEditingCategory] = useState('')
const [editingId, setEditingId] = useState('')


useEffect(() => {
    axios.get('http://localhost:5000/productcategories')
    .then((response) => setProductCategories(response.data))
    .catch((err) => console.log('error fetching product categories, error: ' + err))
}, [])

    const handleLogOut = () => {
       
        
        
        navigate('/admin')
        
        
        
        }

   const handleMenu = () => {
    navigate('/login')
   }


   const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/productcategories/${id}`)
    .then(() => setProductCategories(productCategories.filter(category => category._id !== id)))
    .catch((err) => console.error("Error deleting product category:", err));
   }
   const handleEdit = (e, name, id) => {
    e.preventDefault()
    setVisibilityEditForm(!visibilityEditForm)
    setEditingCategory(name)
    setEditingId(id)

   

   }


   const handleAddCategory = (e) => {
    e.preventDefault()
    console.log('dodano kategorię')

    const name = newProductCategory
   

     axios.post("http://localhost:5000/productcategories", {name})
            .then((response => setProductCategories([...productCategories, response.data])))
            .catch(err => {
                console.error('Error adding product categories', err)
                alert('uuups ... coś poszło nie tak!')
            })

    setNewProductCategory('')
   }


   const handleEditFormSubmit = () => {

    const name = editingCategory
    const id = editingId

    axios.put(`http://localhost:5000/productcategories/${id}`, {name})
    .then((response) => {
            setProductCategories(productCategories.map(category => category._id === id ? response.data : category));
           })
      .catch((err) => console.error("Error updating product category:", err));
      setVisibilityEditForm(null)
   }


    return (
        <div className="app">
    
        <Header/>
       
       <h1>Kategorie produktów</h1>
       <section className="topButtons">
       <button onClick={handleMenu}>Powrót do menu</button> <button onClick={handleLogOut}>Wyloguj się</button>
       </section>
       {visibilityEditForm ? <div><h3>Edycja</h3><div className="productCategoriesEditForm">
        <form onSubmit={handleEditFormSubmit}>
            <input type="text" value={editingCategory} onChange={(e) => setEditingCategory(e.target.value)} />
            <button>Zedytuj</button>
        </form>
       </div></div> : null}
       <div className="productCategories">
        <ul className="productCategoriesList">
        {productCategories.map(productcategory => <li key={productcategory._id}>{productcategory.name} <button onClick={(e) => handleDelete(productcategory._id)}>Usuń</button> <button onClick={(e) => handleEdit(e, productcategory.name, productcategory._id)}>Edytuj</button></li>)}
        </ul>

        
       </div>
       <div className="productCategoriesAdd">
        <h3>Dodaj kategorię</h3>
        <form>
            <input type="text" value={newProductCategory} onChange={(e) => setNewProductCategory(e.target.value)} />
            <button onClick={handleAddCategory}>Dodaj</button>
        </form>
       </div>

 
        

        <Footer/>
    </div>
    )
}

export default ProductCategories;