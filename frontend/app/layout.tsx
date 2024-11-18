"use client";
import './globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className='bg-indi bg-cover scrollbar-hide overflow-auto h-screen '>
        <main>{children}</main>
      </body>
    </html>
  )
}