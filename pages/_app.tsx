import '../styles/globals.css';
import { wrapper } from '../redux/store'
import axios from 'axios';
import https from 'https';
import NProgress from 'nprogress'; 
import 'nprogress/nprogress.css';
import Router from 'next/router';

axios.defaults.httpsAgent = new https. Agent({
  rejectUnauthorized: false
});

Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());  

function App({ Component, pageProps, a }) {

  return (
    <>
      {Component.Layout ?
        <Component.Layout>
          <Component {...pageProps} />
        </Component.Layout> : 
        <Component {...pageProps} />}
    </>
  )
}


export default wrapper.withRedux(App);