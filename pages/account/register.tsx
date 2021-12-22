import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useDispatch  } from 'react-redux';
import { addToCart } from '../../redux/reducerSlicer';


export default function Register() {
  const [user, setUser] = useState({fristName: "", lastName: "", email: "", password: ""});
  const { fristName, lastName, email, password } = user;
  const router = useRouter();
  const dispatch = useDispatch();
  
  return (
    <div className='flex items-center justify-center h-screen  bg-black'>
      <div className="flex flex-col max-w-md px-4 py-8 rounded-lg shadow bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-2 text-xl font-light sm:text-2xl text-white">
          Create a new account
        </div>
        <span className="justify-center text-sm text-center flex-items-center text-gray-400">
          Already have an account ?
        <Link href={router.query.returnUrl? `/account/login?returnUrl=${router.query.returnUrl}`: '/account/login'}>
        <a className="text-sm text-blue-500 underline hover:text-blue-700">
            {" " }Sign in
        </a>
        </Link>
        </span>
        <div className="mt-8"></div>
        <form action="#">
          <div className="flex gap-4 mb-2">
            <div className=" relative ">
              <input 
                type="text"
                value={fristName}
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="fristName"
                placeholder="First name"
                onChange={e =>{
                  const { name, value } = e.target;
                  (setUser({...user, [name]: value}))
                }}
              />
            </div>
            <div className=" relative ">
              <input
                type="text"
                value={lastName}
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="lastName"
                placeholder="Last name"
                onChange={e =>{
                  const { name, value } = e.target;
                  setUser({...user, [name]: value})
                }}
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                type="text"
                name='email'
                value= {email}
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Email"
                onChange={e =>{
                  const { name, value } = e.target;
                  setUser({...user, [name]: value});
                }}
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                type="password"
                name='password'
                value= {password}
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="New Password"
                onChange={e =>{
                  const { name, value } = e.target;
                  setUser({...user, [name]: value})
                }}
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className=" relative ">
              <input
                type="date"
                name='dateOfBrith'
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Date Of Brith"
                onChange={e =>{
                  const { name, value } = e.target;
                  (setUser({...user, [name]: value}))
                }}
                />
            </div>
          </div>
          <div className="inline-flex	items-center mr-2 cursor-pointer m-2 text-gray-100">
            <label htmlFor='male' className='mr-3 inline-flex items-center justify-center'>
              <input type='radio' 
                name='gender' 
                value='male'  
                id='male' 
                className='radio__input'
                onChange={e =>{
                  const { name, value } = e.target;
                  (setUser({...user, [name]: value}))
                }}
              />
              <div className='radio__radio w-5 h-5 p-2 border-2 border-bdrs rounded-full relative box-border mr-2 inline-block'></div>
              Male
            </label>
            <label htmlFor='female' className='mr-5 inline-flex items-center justify-center'>
              <input 
                type='radio'
                name='gender'
                value='female'
                id='female'
                className='radio__input'
              />
              <div className='radio__radio w-5 h-5 p-2 border-2 border-bdrs rounded-full relative box-border mr-2 inline-block'></div>
              Female
            </label>
            <label htmlFor='others' className='mr-3 inline-flex items-center justify-center'>
              <input 
                type='radio'
                name='gender'
                value='others'
                id='others'
                className='radio__input'
                onChange={e =>{
                  const { name, value } = e.target;
                  (setUser({...user, [name]: value}))
                }} 
              />
              <div className='radio__radio w-5 h-5 p-2 border-2 border-bdrs rounded-full relative box-border mr-2 inline-block'></div>
              Others
            </label>
          </div>
          <div className="flex w-full my-4">
            <button 
              type="submit" 
              className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              onClick={async(e) =>{
                e.preventDefault();
                const { data } = await axios.post('https://localhost:44304/api/account/register', user).then(res => res);
                setUser(data);
                Cookies.set("user", JSON.stringify(data));
                if(router.query.productId && data){
                  dispatch(addToCart(router.query.productId.toString()));
                  router.push('/cart')
                }
                router.push('/');
              }}
              >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
