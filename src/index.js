import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import "./index.css"
import App from './App'
import { Provider } from 'react-redux'
import store from './store/index'
import HashLoader from "react-spinners/HashLoader"

const loadingMarkup = (
  <div className="centered-loader">
    <HashLoader color="#417EBF" loading={true} size={50} />
  </div>
)

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
  ,
  document.getElementById('root')
)

