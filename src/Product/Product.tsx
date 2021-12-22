import React, { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { addToCart, getCarts } from '../../redux/reducerSlicer';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { Router, useRouter } from 'next/router';

const MIN_RATING = 0;
const MAX_RATING = 5;
export default function Product({ title, price, description, category, image, Id }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [rating, setRating] = useState(1);
  const [hasprime, setHasprime] = useState(false);
  useEffect(() => {
    setRating(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
    setHasprime(Math.random() > 0.5);
  }, [])
  return (
    <div 
      className='flex flex-col bg-white z-30 p-10 relative m-3 space-x-2 cursor-pointer'
      onClick={() =>{
        router.push(`product/${Id}`)
      }}
    >
      <p className='absolute text-sm top-2 right-2 italic'>{category}</p>
      <img src={image} width={200} height={200} style={{ objectFit: 'contain' }} />
      <h4 className='my-3 text-sm'>{title}</h4>
      <div className='flex'>
        {
          Array(rating).fill("").map((_, i) => (<React.Fragment key={i}>
            <StarIcon className='h-7 text-yellow-500' />
          </React.Fragment>))
        }
      </div>
      <p className='line-clamp-2 my-2 text-xs'>{description}</p>
      <div className='mb-5'>
        <Currency quantity={price} currency="GBP" />
      </div>
      {hasprime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img className='w-12' src='https://links.papareact.com/fdw' alt='' />
          <p className='text-gray-500 text-xs'>FREE Next-day Delivery</p>
        </div>
      )}
      <button
        className='mt-auto button hover:from-yellow-500'
        onClick={function (event) {
          event.stopPropagation();
          if(Cookies.get('user')){
            dispatch(addToCart(Id));
          }else{
            router.push(`/account/register?productId=${Id}`)
          }
        }}
      >Add to Basket</button>
    </div>
  )
}
