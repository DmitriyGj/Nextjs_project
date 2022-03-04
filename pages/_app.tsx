import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { IceAndFireStore } from '../public/src/store/IceAndFireStore';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (<Provider store = {IceAndFireStore}>
            <Component {...pageProps} />
          </Provider>)
}

export default MyApp
