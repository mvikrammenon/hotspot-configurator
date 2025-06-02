import '../styles/globals.css';
import '../styles/custom.scss';
import type { AppProps } from 'next/app';
import { useInitDemo } from '../lib/hooks/useInitDemo';

function MyApp({ Component, pageProps }: AppProps) {
  useInitDemo();
  return <Component {...pageProps} />;
}

export default MyApp;
