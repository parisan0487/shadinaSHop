import type { Metadata } from "next";
import "./globals.css";
import "../styles/custom.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./providers/queryClient";
import NavigationBar from "@/components/navigationBar/navigation";

export const metadata: Metadata = {
  title: "shadinaShop",
  description: "پوشاک بچه گانه شادینا",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="fa">
        <body>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <NavigationBar />
        </body>
      </html>
    </QueryClientProvider>
  );
}
