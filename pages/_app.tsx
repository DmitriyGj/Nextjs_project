import '../styles/globals.css';
import { withLayout } from '../public/src/HOC/Layout/Layout';

import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps)  =>
        (<Component {...pageProps} />);


export default withLayout(MyApp);