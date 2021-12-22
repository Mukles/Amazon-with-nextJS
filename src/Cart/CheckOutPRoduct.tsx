import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useState } from 'react'

export default function CheckOutProduct({ profile, name, description, price }){
    const [hasPrime] = useState(Math.random() < 0.5);
    return(
        <div className='grid grid-cols-5 my-5'>
        <img
            loading='lazy'
            src={profile}
            style={{objectFit: 'contain', height: '200px', width: "200px"}}
        />

        {/* middle */}
        <div className='col-span-3 mx-5'>
            <p>{name}</p>
            <div className='flex'>
               {Array(5)
                .fill("")
                .map((_, i) => <StarIcon key={i} className='h-7 text-yellow-500'/>)
                }
            </div>
            <p className='my-2 line-clamp-3 text-xs'>{description}</p>
            <Currency quantity={price} currency="GBP" />
            {hasPrime &&
                <div className='flex items-center space-x-2'>
                    <img
                        loading='lazy'
                        className='w-12'
                        src='https://links.papareact.com/fdw'
                        alt=''
                    />
                    <p className='text-xs text-gray-500'>FREE NEXT DAY DELIVERY</p>
                </div>
            }
        </div>
        { /* Right */ }
        <div className='flex flex-col space-y-2 my-auto justify-self-end'>
            <button className='button'>Checkout</button>
            <button className="button">Remove From Basket'</button>
        </div>
    </div>
    )
}