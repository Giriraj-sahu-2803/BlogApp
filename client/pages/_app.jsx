import '../styles/globals.scss'
import * as React from 'react';
import  { AppProps } from 'next/app'
import {Layout} from '../components'
import {ApolloClient,ApolloProvider,InMemoryCache} from '@apollo/client';

const client=new ApolloClient({
  uri:process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ,
  cache:new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (

    <Layout>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Layout>
  )
}

export default MyApp
