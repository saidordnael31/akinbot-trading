import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { LanguageProvider } from "@/contexts/LanguageContext"
import "./globals.css"

export const metadata: Metadata = {
  title: "Agroderi - Investimentos em Tokens SET",
  description:
    "Plataforma de investimentos em tokens do setor imobiliário. Invista no futuro do imobiliário com segurança e transparência.",
  generator: "Agroderi",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5MSKXKNB');`,
          }}
        />

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-312P0L6J15" strategy="afterInteractive" />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
             gtag('config', 'G-312P0L6J15');
           `,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5MSKXKNB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
