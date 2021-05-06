import React, {useState,useEffect} from 'react';

import {data} from './data'

import uuid from 'uuid/dist/v4'
const AddToCart = (props) =>{

    const [product, setProduct] = useState('');
    const [disable,setDisable] = useState(false);
    const [action,setAction] = useState("Add")
    const handleChange = (e) => {
        setProduct(e.target.value);
        if(e.target.value == "")
            setDisable(false);
        else
            setDisable(true);
        
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        props.addItem(product);
        setProduct('');
        setDisable(false);
        
    }
    return (
        <form onSubmit={handleChange}>
            {console.log(product)}
            <input type="text" onChange={handleChange} value={product} placeholder="Search item..."/>
            {disable ? <input type="submit" value={action} onClick={handleSubmit} /> : <input type="submit" onClick={handleSubmit} value={action} disabled/> }
            
        </form>
    )

}

const Products = (props) =>{
    
    

    return(
        
        props.datas.map((prod) => {
            const {id, name} = prod;
            return (
                <div key={id}>
                    <li>{name}</li>
                    <button onClick={() => props.deleteItem(id)}>DEL</button>
                    <button onClick={() => props.editItem(id)}>EDIT</button>
                    
                </div>
                
            )
            
        })
    )
    

}



function Cart(){

    const [products,setProducts] = useState(data);
    const [edit,setEdit] = useState(false);
    function addItem(PRODUCT){
        let newItem = {id: uuid(), name: PRODUCT};
        setProducts([...products, newItem]);
        console.log(products);
    }
    function deleteItem(itemId){
        let newItem = products.filter((prod) => prod.id !=  itemId);
        setProducts(newItem);
    }
    function editItem(editItem){
        const tobeEditemItem = products.filter((prod) => prod.id ===  editItem);
        

        
        // products.map((prod) => {
        //     if(prod.id == editItem)
        //     {
        //         prod.name = tobeEditemItem;
        //     }
        // })
        
    }
    return (
        <div>
            <AddToCart addItem={addItem}/>
            <Products datas={products} deleteItem={deleteItem} editItem={editItem}/>
            
        </div>
    )
}



export default Cart
