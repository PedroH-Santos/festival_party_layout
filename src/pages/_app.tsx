import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { queryClient } from '../services/queryClient';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>

          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>

      </QueryClientProvider>
    </>
  )
}


