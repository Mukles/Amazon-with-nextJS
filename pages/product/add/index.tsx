import { Admistator } from '../../../src/Layout/admistatorLayout';
import { useState } from 'react';
import axios from 'axios';

const Product = () => {
    const [productDetails, setProductDetails] = useState({ name: '', description: '', price: '', catagory: "", profile: null, secondaryImages: null });
    return (
        <form className='p-3'>
            <div className='ProductName'>
                <label htmlFor='productName'>Name</label>
                <input
                    type='text'
                    id='productName'
                    name='name'
                    className="appearance-none w-full my-3 border-2 border-purple-500 dark:border dark:border-transparent py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    onChange={(e) =>{
                        const { name, value } = e.target;
                        setProductDetails({...productDetails, [name]: value});
                    }}
                />
            </div>
            <div className='ProductName'>
                <label htmlFor='productName'>Price</label>
                <input
                    type='number'
                    name='price'
                    id='productPrice'
                    className="appearance-none w-full my-3 border-2 border-purple-500 dark:border dark:border-transparent py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    onChange={(e) =>{
                        const { name, value } = e.target;
                        setProductDetails({...productDetails, [name]: value});
                    }}
                />
            </div>
            <div className='ProductDiscription'>
                <label htmlFor='descriptionn'>Discription</label>
                <input
                    type='text'
                    id='description'
                    name='description'
                    className="appearance-none w-full my-3 border-2 border-purple-500 dark:border dark:border-transparent py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    onChange={(e) =>{
                        const { name, value } = e.target;
                        setProductDetails({...productDetails, [name]: value});
                    }}
                />
            </div>
            <div className='catagory'>
                <label htmlFor='catagory'>catagory</label>
                <input 
                    type='text' 
                    id='catagory'
                    name='catagory'
                    className="appearance-none w-full my-3 border-2 border-purple-500 dark:border dark:border-transparent py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    onChange={(e) =>{
                        const { name, files } = e.target;
                        setProductDetails({...productDetails, [name]: files});
                    }}
                />
            </div>
            <div className='profile'>
                <label htmlFor='profile'>File</label>
                <input 
                    type='file' 
                    id='profile'
                    name='profile'
                    className="appearance-none w-full my-3 border-2 border-purple-500 dark:border dark:border-transparent py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    onChange={(e) =>{
                        const { name, files } = e.target;
                        setProductDetails({...productDetails, [name]: files});
                    }}
                />
            </div>
            <div className='productGallery'>
                <label htmlFor='secondaryImages'>Name</label>
                <input 
                    type='file' 
                    id="secondaryImages"
                    name='secondaryImages'
                    className="appearance-none w-full my-3 border-2 border-purple-500 dark:border dark:border-transparent py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                    onChange={(e) =>{
                        const { name, files } = e.target;
                        setProductDetails({...productDetails, [name]: files});
                    }}
                    multiple
                />
            </div>
            <button
                onClick={async (e) => {
                    e.preventDefault();
                    let formdata = new FormData();
                    Object.keys(productDetails).forEach(key => {
                        formdata.append(`${key}`, productDetails[key]);
                    });
                    [...productDetails.profile].forEach(file => formdata.append('profile', file));
                    [...productDetails.secondaryImages].forEach(file =>{
                        formdata.append('secondaryImages', file);
                    });
                    try{
                        const { data } = await axios.post("https://localhost:44304/api/Product/Add", formdata, {headers: { "Content-Type": "multipart/form-data" }})
                        console.log(data);
                    }
                    catch(err){
                        console.log(err)
                    }
                }}
            >
                submit
            </button>
        </form>
    )
}

Product.Layout = Admistator;

export default Product;