import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleTagManager } from "@next/third-parties/google";
import { Montserrat } from "next/font/google";
import cn from "~/utils/cn";
import KShorts from "~/components/KShorts";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--montserrat" });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <main className={cn("font-sans", montserrat.variable)}>
        <Component {...pageProps} />
      </main>
      <GoogleTagManager gtmId="GTM-5BPLT28V" />
      <KShorts />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
