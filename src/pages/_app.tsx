import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { queryClient } from '../services/queryClient';
import { QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }: AppProps) {
  return  (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
