import Script from "next/script";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import Header from "../components/Header";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({Component, pageProps}) {
  return (
    <div className="bg-[#F5F6F8] min-h-screen  pr-20 pt-[87px] w-screen overflow-x-hidden">
      <Script src="https://widget.cloudinary.com/v2.0/global/all.js" />
      <Header />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
