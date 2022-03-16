import '../styles/globals.css';
import { withLayout } from '../public/src/HOC/Layout/Layout';
import { wrapper } from '../public/src/store/IceAndFireStore';
import type { AppProps } from 'next/app';
import  ErrorBoundary  from '../public/src/HOC/ErrorBoundary/ErrorBoundary';

const MyApp = ({ Component, pageProps }: AppProps)  =>
        (<ErrorBoundary>
                <Component {...pageProps} />
        </ErrorBoundary>);


export default wrapper.withRedux(withLayout(MyApp));