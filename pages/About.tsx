import React from 'react'
import Head from 'next/head'
import Image from 'next/image';
import { SearchIcon, MenuIcon, } from '@heroicons/react/solid';
import ShoppingCartIcon from '@heroicons/react/outline/ShoppingCartIcon'

export default function About() {
  return (
    <header className=''>
      <div className='bg-amazon_blue flex items-center p-2 space-x-6'>
        <Head>
          <title>Home</title>
          <meta name="description" content="Home Page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Image
          className='cursor-pointer'
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          width={150}
          height={40}
          objectFit="contain"
        />
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
            <p className='text-xs'>Hello, Mukles Hossen</p>
            <p className='font-extrabold md:text-sm text-xs'>Account & Lists</p>
          </div>
          <div className='link'>
            <p className='text-xs'>Returns</p>
            <p className='md:text-smt text-xs font-extrabold'>& Orders</p>
          </div>
          <div className='flex relative items-center link'>
            <ShoppingCartIcon className='h-8' />
            <span className='absolute bottom-5 left-5 h-4 w-4 rounded-full bg-yellow-400 text-center flex items-center justify-center font-extrabold text-sx'>
              0
          </span>
            <p className='md:text-sm text-xs font-extrabold hidden md:block'>Basket</p>
          </div>
        </div>
      </div>
      { /*Bottom Nav */}
      <div className='flex items-center text-white bg-amazon_blue-light space-x-3'>
        <p className='flex items-center link text-sm'>
          <MenuIcon className='h-10' />
          All
        </p>
        <p>Prime Video</p>
        <p className='link text-sm'>Amazon Business</p>
        <p className='link text-sm'>Today's Deals</p>
        <p className='link text-sm'>Electronics</p>
        <p className='link text-sm'>Food & Grocery</p>
        <p className='link text-sm'>Prime</p>
        <p className='link text-sm'>Buy Again</p>
        <p className='link text-sm'>Shopper Toolkit</p>
        <p className='link text-sm'>Health & Personal Care</p>
      </div>
    </header>
  )
}
