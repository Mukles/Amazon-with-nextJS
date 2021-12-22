import { StarIcon } from "@heroicons/react/solid";
import axios from "axios"
import { useEffect, useState } from "react";
import { wrapper } from "../../../redux/store"
import Layout from "../../../src/Layout/Layout";
import Currency from 'react-currency-formatter';
import React from 'react';

export default function ShowProductById({ product }) {
    const MIN_RATING = 0;
    const MAX_RATING = 5;
    const [rating, setRating] = useState(1);
    useEffect(() => {
        setRating(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
    });

    return (
        <Layout>
            {
                product ? (
                    <div className='lg:flex w-5/6'>
                        {/*Left section */}
                        <ul className=''>
                            <li>
                                <img src='' />
                            </li>
                        </ul>
                        {/*Middle section */}
                        <div className='title-img  text-center' style={{width: '33rem'}}>
                            <img src={product.profile} alt={product.name} />
                        </div>
                        {/*Right section */}
                        <div className=' lg:mt-12'>
                            <h4 className='text-3xl font-semibold'>{product.name}</h4>
                            <a className='text-xs lg:text-base hover:underline hover:text-yellow-600 text-blue-300 mb-4' href=''>Visit the Apple Store</a>
                            <div className='flex justify-between items-center'>
                                <div className='flex'>
                                    {
                                        Array(rating).fill("").map((_, i) => (<React.Fragment key={i}>
                                            <StarIcon className='lg:h-5 h-3 text-yellow-500 cursor-pointer' />
                                        </React.Fragment>))
                                    }
                                </div>
                                <a className='lg:text-base text-xs hover:underline hover:text-yellow-600 text-blue-300' href=''>3,004 ratings |</a>
                                <a className='lg:text-base text-xs hover:underline hover:text-yellow-600 text-blue-300' href=''>282 answered questions</a>
                            </div>
                            <p className='bg-amazon_blue px-2 inline-block'>
                                <span className='text-bold text-white'>Amazon's </span>
                                <span className='text-yellow-500 text-bold'>Choise</span>
                            </p>
                            <hr className='mt-5' />
                            <p>
                                <span>M.R.P </span>
                                <Currency quantity={product.price} currency="GBP"  />
                            </p>
                            <p>Price: <span className='text-yellow-700 font-bold text-xl'>$500000</span></p>
                            <p></p>
                        </div>
                    </div>
                ) : <h1>Product Not Found</h1>
            }

        </Layout>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
    const { id } = ctx.query;
    const { data } = await axios.get(`https://localhost:44304/api/Product/${id}`)
    return {
        props: {
            product: data
        }
    }
})