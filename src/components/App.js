import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../css/style.css'
import {Provider} from 'react-redux'
import store from '../redux/store'
import MainSite from './MainSite'
import AdminMainSite from './AdminMainSite'
import ProductsAndStore from './ProductsAndStore';
import MostWanted from './MostWanted';
import ShopData from './ShopData';
import ProductCategories from './ProductCategories';
import Clients from './Clients';
import Orders from './Orders';
import Invoices from './Invoices';
import Subsites from './Subsites';
import LogIn from './LogIn';
import AddNewAccount from './AddNewAccount';
import SingleSite from './SingleSite'
import LogInUser from './LogInUser'
import Favourites from './Favourites';
import Basket from './Basket'
import OrderCompleted from './OrderCompleted'
import MyOrders from './MyOrders';
import Invoice from './Invoice'




const App = () => {
  return (
    <Provider store = {store}>
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<AdminMainSite/>} />
        <Route path="/products-store" element={<ProductsAndStore/>} />
        <Route path="/product-categories" element={<ProductCategories/>} />
        <Route path="/clients" element={<Clients/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/invoices" element={<Invoices/>} />
        <Route path="/subsites" element={<Subsites/>} />
        <Route path="/most-wanted" element={<MostWanted/>} />
        <Route path="/shop-data" element={<ShopData/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/new-account" element={<AddNewAccount/>} />
        <Route path="/site" element={<SingleSite/>} />
        <Route path="/favourites" element={<Favourites/>} />
        <Route path="/basket" element={<Basket/>}/>
        <Route path="/order-completed" element={<OrderCompleted/>}/>
        <Route path="/my-orders" element={<MyOrders/>}/>
        <Route path="/invoice" element={<Invoice/>}/>
       

       </Routes>
    </Router>
    </Provider>
  );
};

export default App;
