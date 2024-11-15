"use client";
import './globals.css'
import Starfield from 'react-starfield'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
      <Starfield
                starCount={1000}
                starColor={[255, 255, 255]}
                speedFactor={0.05}
                backgroundColor="black"
        />        
        <main>{children}</main>
      </body>
    </html>
  )
}