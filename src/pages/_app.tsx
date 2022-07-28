import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { queryClient } from '../services/queryClient';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from '../contexts/AuthContext';
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>

            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>

        </QueryClientProvider>
      </AuthProvider>
    </>
  )
}


