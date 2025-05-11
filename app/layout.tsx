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
  title: "Ken Wu - Software Engineer & Chess Enthusiast",
  description: "Ken Wu's personal portfolio showcasing projects in AI/ML, web development, and his passion for basketball, chess, and anime.",
  openGraph: {
    title: "Ken Wu - Portfolio",
    description: "Explore Ken Wu's work, skills, and interests.",
    url: "https://kenwu.dev",
    siteName: "Ken Wu",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Ken Wu Portfolio OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ken Wu - Software Engineer & Chess Enthusiast",
    description: "Ken Wu's personal portfolio.",
    images: ["/og-image.png"], 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/KenWuCircular.png',
    apple: '/KenWuCircular.png',
  },
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