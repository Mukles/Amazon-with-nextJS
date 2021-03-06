import Head from 'next/head';
import axios from 'axios';
import Layout from '../src/Layout/Layout';
import Banner from '../src/Banner';
import ProductFeed from '../src/Product/ProductFeed';
import { useEffect } from 'react';
import { wrapper } from '../redux/store';

export default function Home({ products }) {
  return (
    <section id=
    'home' className='bg-gray-100'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className='max-w-screen-2xl mx-auto'>
          <Banner />
          <ProductFeed products={products} />
        </main>
      </Layout>
    </section >
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
      const { data } = await axios.get('https://localhost:44304/api/Product').then(res => res);
     
    return {
      props: {
        products: data
      }
    }
});