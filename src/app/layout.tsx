import type { Metadata } from 'next'
import { Epilogue } from 'next/font/google'
import './globals.css'

const epilogue = Epilogue({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Front-End Online Store',
  description: 'Buy products with Free Shipping on the same day at Mercado Libre. Find thousands of brands and products at incredible prices.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={epilogue.className}>{children}</body>
    </html>
  )
}
