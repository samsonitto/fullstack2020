import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client' 

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('token')
    console.log('operation', operation);
    
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
  
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)