import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'
import Navbar from '@/components/common/Navbar'
import { Toaster } from 'react-hot-toast'
import IsLoggedin from '../components/core/Home/isLoogedin'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Study-notion',
  description: 'A modern Ed-tech platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Toaster />
          <div className='flex flex-col w-screen min-h-screen overflow-x-hidden overflow-y-auto bg-richblack-900 font-inter'>
            <Navbar />
            <IsLoggedin />
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}
