import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LawSphere',
  description: 'Created with Heart',
  generator: 'Zain',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
