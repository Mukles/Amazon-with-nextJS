import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import { Store} from 'redux';
import {createWrapper, Context} from 'next-redux-wrapper';
import  { reducerSlicer } from './reducerSlicer';

const str: Store = configureStore({
    reducer: {
        reducer: reducerSlicer.reducer
    }
}) as Store;


export const makeStore = (context: Context):Store =>{
    return str;
}


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export const wrapper =  createWrapper<AppStore>(makeStore, {debug: false});
export type RootState = ReturnType<AppState>
export type AppDispatch = typeof str.dispatch;