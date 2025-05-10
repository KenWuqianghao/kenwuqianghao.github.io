import type { Metadata } from "next"
import "./globals.css"
import { Outfit, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

// Font for headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

// Font for body text
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ken Wu - Personal Portfolio",
  description: "Ken Wu is a software engineer and ML enthusiast currently studying at the University of Waterloo.",
  icons: {
    icon: '/KenWuCircular.png',
    apple: '/KenWuCircular.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <Script id="suppress-hydration" strategy="beforeInteractive">
          {`
            (function() {
              // Remove Dark Reader attributes before React hydration
              function cleanDarkReaderAttrs() {
                document.querySelectorAll('[data-darkreader-inline-color], [data-darkreader-inline-bgcolor], [data-darkreader-inline-stroke]').forEach((el) => {
                  el.removeAttribute('data-darkreader-inline-color');
                  el.removeAttribute('data-darkreader-inline-bgcolor');
                  el.removeAttribute('data-darkreader-inline-stroke');
                  el.removeAttribute('data-darkreader-inline-outline');
                  
                  // Also clean up style attributes with --darkreader properties
                  if (el.style && el.getAttribute('style') && el.getAttribute('style').includes('--darkreader')) {
                    const style = el.getAttribute('style');
                    el.setAttribute('style', style.replace(/--darkreader[^;]+;/g, ''));
                  }
                });
              }
              
              // Run once and set interval to clean continuously during load
              cleanDarkReaderAttrs();
              const interval = setInterval(cleanDarkReaderAttrs, 50);
              setTimeout(() => clearInterval(interval), 2000);
              
              // Also run after document is loaded
              document.addEventListener('DOMContentLoaded', cleanDarkReaderAttrs);
            })();
          `}
        </Script>
      </head>
      <body 
        className={`${outfit.variable} ${poppins.variable} font-body`}
        style={{ isolation: "isolate" }}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div suppressHydrationWarning>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
