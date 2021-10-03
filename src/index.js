import React from 'react'
import ReactDOM from 'react-dom'
import { TODOApplication } from './components'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Helmet } from 'react-helmet'

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <title>📝 TO-DO</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Tangerine:wght@700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <Provider store={store}>
      <TODOApplication />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
