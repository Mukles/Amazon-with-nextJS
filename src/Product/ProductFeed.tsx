import React from 'react';
import Product from './Product';

export default function ProductFeed({products}) {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-3 lg:gird-cols-4 md:-mt-52 mx-auto'>
      {
        products.length > 0 ?
        products.map(({name, price, description, category, profile,id}, i) =>
          <Product
            key={i}
            title ={name}
            price ={price}
            description ={description}
            category ={category}
            image ={profile}
            Id ={id}
          />
        ): null
      }
    </div>
  )
}