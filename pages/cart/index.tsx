import Image from 'next/image';
import CheckOutProduct from '../../src/Cart/CheckOutPRoduct';
import Currency from 'react-currency-formatter';
import { getCarts, setUserDetails } from '../../redux/reducerSlicer'
import Cookies from 'js-cookie';
import Layout from '../../src/Layout/Layout'
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useAppSelector } from '../../redux/hook';
import router from 'next/router';

function Cart() {
    if (Cookies.get('user')) {
        const { cart } = useAppSelector(state => state.reducer);
        const total = cart.length && cart.reduce(function (previous, current, index, array) {
            return previous + current.price
        }, 0);

        return (
            <Layout>
                <div className='bg-gray-100'>
                    <main className='lg:flex max-w-screen-2xl mx-auto'>
                        { /* left side */}
                        <div className='flex-grow m-5 shadow-sm'>
                            <Image
                                className='mx-auto'
                                src="https://links.papareact.com/ikj"
                                width={1020}
                                height={250}
                                objectFit={"contain"}
                            />
                            <div className='flex flex-col p-5 space-y-10 bg-white'>
                                {
                                    cart.length > 0 ?
                                        <>
                                            <h1 className='text-3xl border-b pb-4'>
                                                {cart.length === 0
                                                    ? "Your Amazon Basket is empty."
                                                    : "Shopping Cart"
                                                }
                                            </h1>
                                            {
                                                cart.length && cart.map((item, idx) => <CheckOutProduct {...item} key={idx} />)
                                            }
                                        </>
                                        : "Loading...."
                                }

                            </div>
                        </div>
                        {/* Right Side */}
                        <div className='flex flex-col bg-white p-10 shadow-md flex-shrink'>
                            <h2 className='whitespace-nowrap'>
                                Subtotal({cart.length} items): {" "}
                                <span className='font-bold'>
                                    {" "}<Currency quantity={total} currency="GBP" />
                                </span>
                            </h2>
                            <button className='button'>Checkout All</button>
                        </div>
                    </main>
                </div>
            </Layout>
        )
    }
    else {
        router.push('/account/register?returnUrl=/cart');
        return null;
    }
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false })

