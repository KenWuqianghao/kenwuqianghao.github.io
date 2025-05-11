import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Outfit, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

// Font for headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

// Font for body text
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://kenwu.dev"),
  title: "Ken Wu - Software Engineer & Chess Enthusiast"
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
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
        className={`${outfit.variable} ${poppins.variable} font-sans bg-background text-foreground`}
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