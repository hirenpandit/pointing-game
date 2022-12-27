import '../styles/globals.css'
import {Provider} from 'react-redux'

import store from '../redux/store'
import Layout from '../components/layout'

import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout> 
    </Provider>
  )
}

export default MyApp
