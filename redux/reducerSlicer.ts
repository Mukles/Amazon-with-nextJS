import { createSlice, createAsyncThunk, PayloadAction, AsyncThunkAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import Cookies from 'js-cookie';

export const getProducts = createAsyncThunk('gets/product', async () => {
  const { data } = await axios.get('https://localhost:44304/api/Product').then(res => res);
  return data;
});

export const addToCart = createAsyncThunk<any, string>("posts/addCart", async (Id: string) => {
  const { email } = JSON.parse(Cookies.get("user"));
  const { data } = await axios.post('https://localhost:44304/api/cart/add', { email, productId: Id }).then(res => res);
  Cookies.set('cart', JSON.stringify([ ...JSON.parse(Cookies.get('cart')), data ]));
  return data;
});


export const getCarts = createAsyncThunk("gets/cart", async (email: string) => {
  if (!Cookies.get('cart')) {
    const { data } = await axios.get('https://localhost:44304/api/cart', {params: { email }}).then(res => res);
    Cookies.set('cart', JSON.stringify(data));
    return data;
  }
  return JSON.parse(Cookies.get('cart'));
})

export const reducerSlicer = createSlice({
  name: 'reducer',
  initialState: {
    email: "",
    cart: [],
    products: [],
    status: null,
    fristName: "",
    lastName: ""
  },
  reducers: {
    inputData: (state, { payload: { name, value } }) => {
      return { ...state, [name]: value }
    },
    setUserDetails: (state, { payload }) => {
      return { ...state, ...payload }
    }
  },
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state, ACTION) => {
      state.status = 'loading';
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      return { ...state, status: "success", products: payload };
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      return { ...state, status: "failed", products: [] };
    });
    builder.addCase(addToCart.pending, (state, action) => {
      state.status = 'loading'
    });
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      return { ...state, cart:[...state.cart, payload]}
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(getCarts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getCarts.fulfilled, (state, { payload }) => {
      return { ...state, cart: payload }
    });
    builder.addCase(getCarts.rejected, (state, action) => {
      return { ...state, status: 'faild' }
    });
    builder.addCase(HYDRATE, (state, action: any) => {
      return { ...state, ...action.payload }
    });
  }
})

export const { inputData, setUserDetails } = reducerSlicer.actions;
export default reducerSlicer.reducer;