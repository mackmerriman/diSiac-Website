import "../global.css";
import { Montserrat } from "next/font/google";
import {} from "react-scroll-parallax";
import { SessionProvider } from "next-auth/react";

const monstserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <main className={monstserrat.className}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
