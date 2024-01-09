import type { Metadata } from 'next'
import { Epilogue } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import StoreProvider from '@/context/StoreContext'

const epilogue = Epilogue({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Front-End Online Store',
  description: 'MercadoLivre Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
