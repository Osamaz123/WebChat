import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "flex flex-col min-h-screen antialiased bg-gradient-to-br from-blue-100 to-purple-100")}>
        <Providers>
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold text-gray-900">WebChat</h1>
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="bg-white shadow-sm mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} WebChat. All rights reserved.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}