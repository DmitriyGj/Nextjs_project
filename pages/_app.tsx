import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { IceAndFireStore } from '../public/src/store/IceAndFireStore';
import { Provider } from 'react-redux';
import { wrapper } from '../public/src/HOC/ReduxWeapper/ReduxWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (<Component {...pageProps} />);
}

export default wrapper.withRedux(MyApp);
