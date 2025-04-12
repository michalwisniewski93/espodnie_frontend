import React, {useState, useEffect} from 'react'
import Header from './Header';
import Footer from './Footer';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


const ProductsAndStore = () => {

 


    const [visibilityAddingNewProductForm, setVisibilityAddingNewProductForm] = useState(false)

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [storePieces, setStorePieces] = useState('')
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [editingImageUrl, setEditingImageUrl] = useState('')

    const [fetchedcategories, setFetchedCategories] = useState([])

    const [products, setProducts] = useState([])

    const [visibilityEditForm, setVisibilityEditForm] = useState(false)

    const [editingName, setEditingName] = useState('')
    const [editingDescription, setEditingDescription] = useState('')
    const [editingPrice, setEditingPrice] = useState('')
    const [editingCategory, setEditingCategory] = useState('')
    const [editingStorePieces, setEditingStorePieces] = useState('')
    const [editingId, setEditingId] = useState('')


const navigate = useNavigate()

    const handleLogOut = () => {
    
        navigate('/admin')        
    }

   const handleMenu = () => {
    navigate('/login')
   }

   const handleAddProduct = () => {
    setVisibilityAddingNewProductForm(!visibilityAddingNewProductForm)
    scrollToTop()
   }

   useEffect(() => {
    axios.get('http://localhost:5000/productcategories')
    .then((response) => setFetchedCategories(response.data))
    .catch((err) => console.log('error fetching product categories, error: ' + err))
   }, [])

   useEffect(() => {
    axios.get('http://localhost:5000/products')
    .then((response) => setProducts(response.data))
    .catch((err) => console.log('error fetching products, error: ' + err))
   }, [])


   useEffect(() => {
    const productname = productName
    const price = productPrice
    const description = productDescription
    const category = productCategory
    const imageurl = imageUrl
    const storepieces = storePieces
    if (imageUrl !== '') {
     
      axios.post("http://localhost:5000/products", {productname, price, description, category, imageurl, storepieces})
        .then(response => setProducts([...products, response.data]))
        .catch(err => console.error('Error adding products', err));
    }

    setProductName('')
    setProductPrice('')
    setProductDescription('')
    setProductCategory('')
    setStorePieces('')
  }, [imageUrl]);





   const  scrollToTop = () =>  {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(productName === '' || productPrice === '' || productDescription === '' || productCategory === '' || storePieces === '')
    {
        alert('Żadne z pól formularza nie może być puste.')
        return 
    }


    if (!file) {
      alert('Wybierz plik');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Zapisujemy pełną ścieżkę do obrazu w stanie
     
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading file', error);
    }


    // tu chyba jest błąd, przeanalizować!
    const productname = productName
    const price = productPrice
    const description = productDescription
    const category = productCategory
    const imageurl = editingImageUrl
    const storepieces = storePieces


    setVisibilityAddingNewProductForm(!visibilityAddingNewProductForm)


  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`)
          .then(() => setProducts(products.filter(product => product._id !== id)))
          .catch((err) => console.error("Error deleting product:", err));
  }

  const handleEditProduct = (id, name, description, price, category, storepieces, imageurl) => {
    scrollToTop()
    setVisibilityEditForm(!visibilityEditForm)
    setEditingName(name)
    setEditingDescription(description)
    setEditingPrice(price)
    setEditingCategory(category)
    setEditingStorePieces(storepieces)
    
    setEditingId(id)
  }



  const handleEditFormSubmit = async (e) => {
    e.preventDefault()
    
    if(editingName === '' || editingDescription === '' || editingPrice === '' || editingCategory === '' || editingStorePieces === '')
    {
      alert('wszystkie pola formularza muszą być wypełnione')
      return 
    }

    if (!file) {
      alert('Wybierz plik');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    let uri = ''

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Zapisujemy pełną ścieżkę do obrazu w stanie
      uri = response.data.imageUrl 
     
     
       
      
      console.log('editingImageUrl' + editingImageUrl)
    } catch (error) {
      console.error('Error uploading file', error);
    }


    //put 


    const productname = editingName
        const price = editingPrice
        const description = editingDescription
        const category = editingCategory
        const imageurl = uri
        const storepieces = editingStorePieces 
    
       
    
    
        axios.put(`http://localhost:5000/products/${editingId}`, {productname, price, description, category, imageurl, storepieces})
       .then((response) => {
               setProducts(products.map(product => product._id === editingId ? response.data : product));
               setEditingId(null); // Zakończ edycję
               setEditingCategory('')
               setEditingDescription('')
               setEditingName('')
               setEditingPrice('')
               setEditingStorePieces('')
              })
         .catch((err) => console.error("Error updating product:", err));
  


    setVisibilityEditForm(!visibilityEditForm)
  }


 



    return (
        <div className="app">
        
    
        <Header/>
       
       <h1>Produkty ({products.length}) i magazyn</h1>
       <section className="topButtons">
       <button onClick={handleAddProduct}>Dodaj nowy produkt</button><button onClick={handleMenu}>Powrót do menu</button> <button onClick={handleLogOut}>Wyloguj się</button>
       </section>
       <div className="products">
        {visibilityAddingNewProductForm ? (
            <div>
                <h3>Dodawanie nowego produktu</h3>
                <form onSubmit={handleSubmit}>
                    <label>Nazwa produktu:
                        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </label>
                    <label>Opis produktu:
                        <input type="text" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                    </label>
                    <label>Cena produktu:
                        <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value.replace(',', '.'))} />
                    </label>
                    <label>Kategoria:
                    <select name="category" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                     
                    <option>Wybierz z listy</option>
                    {fetchedcategories.map(category => <option  key={category._id}>{category.name}</option>)}
                    </select>
                    </label>
                    <label>Zdjęcie: <span className="warning">Uwaga! jeżeli po edycji zdjęcie się nie zaktualizuje w widoku produktu - odśwież stronę</span>
                        <input type="file" onChange={handleFileChange}/>
                    </label>
                    <label>Stan magazynowy (szt.):
                    <input type="number" value={storePieces} onChange={(e) => setStorePieces(Math.round(e.target.value.replace(',', '.')))} />
                    </label>
                   
                    <button>Dodaj</button>
                </form>
            </div>): null}
            
           
       </div>
       <div className="productEditingForm">
        {visibilityEditForm ? (
          <div>
            <form onSubmit={handleEditFormSubmit}>
            <label>Nazwa produktu:
                        <input type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} />
                    </label>
                    <label>Opis produktu:
                        <input type="text" value={editingDescription} onChange={(e) => setEditingDescription(e.target.value)} />
                    </label>
                    <label>Cena produktu:
                        <input type="number" value={editingPrice} onChange={(e) => setEditingPrice(e.target.value.replace(',', '.'))} />
                    </label>
                    <label>Kategoria:
                    <select name="category" value={editingCategory} onChange={(e) => setEditingCategory(e.target.value)}>
                     
                    <option>Wybierz z listy</option>
                    {fetchedcategories.map(category => <option  key={category._id}>{category.name}</option>)}
                    </select>
                    </label>
                    <label>Zdjęcie:
                      <span className="warning">Uwaga! załaduj zdjęcie ponownie</span>
                        <input type="file" onChange={handleFileChange}/>
                    </label>
                    <label>Stan magazynowy (szt.):
                    <input type="number" value={editingStorePieces} onChange={(e) => setEditingStorePieces(Math.round(e.target.value.replace(',', '.')))} />
                    </label>
                    <button>Zedytuj</button>
            </form>
          </div>
          ) : null}
       </div>
       <div className="productsList">
        {products.map(product => (
          <div className="singleProduct" key={product._id}>
            <h4>nazwa produktu: {product.productname}</h4>
            <h4>opis produktu: {product.description}</h4>
            <h4>cena (PLN): {product.price}</h4>
            <h4>kategoria: {product.category}</h4>
            <h4>stan na magazynie (szt.): {product.storepieces}</h4>
            <h4>zdjęcie produktu:</h4>
            <img src={`http://localhost:5000${product.imageurl}`} alt={product.productname} />
            <button onClick={() => handleDelete(product._id)}>Usuń produkt</button><button onClick={() => handleEditProduct(product._id, product.productname, product.description, product.price, product.category, product.storepieces, product.imageurl)}>Edytuj produkt</button>
          </div>))}
       </div>

 
        

        <Footer/>
    </div>
    )
}

export default ProductsAndStore;