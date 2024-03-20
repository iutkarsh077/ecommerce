import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { GlobalContextProvider } from "@/context/GlobalContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Amazon",
  description: "Shopping App",
};

export default function RootLayout({ children }) {
  return (
    <GlobalContextProvider>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning={true}>
          <body className={`{inter.className} bg-gray-600 text-white`}>
            <NavbarDemo />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </GlobalContextProvider>
  );
}
