import React, { useEffect } from 'react'
import Image from 'next/image';
import { SearchIcon, MenuIcon, } from '@heroicons/react/solid';
import ShoppingCartIcon from '@heroicons/react/outline/ShoppingCartIcon';
import Link from 'next/link';
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic';
import { useAppSelector } from '../redux/hook';
import { useDispatch } from 'react-redux';
import { getCarts } from '../redux/reducerSlicer';

function About() {
  const dispatch = useDispatch();
  const { cart } = useAppSelector(state => state.reducer);
  const { fristName, lastName, email } = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : useAppSelector(state => state.reducer);

  useEffect(() => {
    !cart.length && Cookies.get('user')? dispatch(getCarts(email)): null;
  }, [cart.length]);

  return (
    <header>
      <div className='bg-amazon_blue flex items-center p-2 md:space-x-5'>
        <Link href='/'>
          <a>
            <Image
              className='cursor-pointer'
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
              width={150}
              height={40}
              objectFit="contain"
            />
          </a>
        </Link>
        <div className='flex-grow items-center bg-yellow-400 h-10 hidden md:flex overflow-hidden'>
          <select
            className='h-10 focus:outline-none border-gray-300 bg-gray-100'>
            <option>Product Catagory</option>
          </select>
          <input
            className='h-full focus:outline-none flex-grow p-2'
            type='text'
          />
          <SearchIcon className='h-12 p-4 text-amazon_blue hover:bg-yellow-500 rounded-md' />
        </div>
        <div className='flex items-center text-white whitespace-nowrap ml-auto space-x-5'>
          <div className='link'>
            <p
              className='text-xs cursor-pointer'
            >Hello, {fristName !=='' && lastName !==''? fristName + " " + lastName: "Sign in"}</p>
            <p className='font-extrabold md:text-sm text-xs'>Account & Lists</p>
          </div>
          <div className='link'>
            <p className='text-xs'>Returns</p>
            <p className='md:text-smt text-xs font-extrabold'>& Orders</p>
          </div>
          <Link href={!Cookies.get('user') ? `/account/register?returnUrl=/cart` : '/cart'}>
            <a>
              <div className='flex relative items-center link'>

                <ShoppingCartIcon className='h-8' />
                <span className='absolute bottom-5 left-5 h-5 w-5 rounded-full bg-yellow-400 text-center flex items-center justify-center font-extrabold text-sx'>
                  {cart.length}
                </span>
                <p className='md:text-sm text-xs font-extrabold hidden md:block'>Basket</p>

              </div>
            </a>
          </Link>
        </div>
      </div>
      { /*Bottom Nav */}
      <div className='whitespace-nowrap items-center text-white bg-amazon_blue-light space-x-3 hidden md:flex'>
        <p className='flex items-center link text-sm'>
          <MenuIcon className='h-10' />
          All
        </p>
        <p className='link md:text-xs lg:text-sm'>Prime Video</p>
        <p className='link md:text-xs lg:text-sm'>Amazon Business</p>
        <p className='link md:text-xs lg:text-sm'>Today's Deals</p>
        <p className='link md:text-xs lg:text-sm'>Electronics</p>
        <p className='link md:text-xs lg:text-sm'>Food & Grocery</p>
        <p className='link md:text-xs lg:text-sm'>Prime</p>
        <p className='link md:text-xs lg:text-sm'>Buy Again</p>
        <p className='link md:text-xs lg:text-sm'>Shopper Toolkit</p>
        <p className='link md:text-xs lg:text-sm'>Health & Personal Care</p>
      </div>
    </header>
  )
}

export default dynamic(() => Promise.resolve(About), { ssr: false })