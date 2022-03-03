import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { charactersStore } from '../public/src/store/CharactersStore';

function MyApp({ Component, pageProps }: AppProps) {
  return (<Provider store = {charactersStore}>
    <Component {...pageProps} />
  </Provider>)
}

export default MyApp
