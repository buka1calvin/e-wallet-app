import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-primary text-text flex md:flex-row flex-col items-center justify-between md:px-20 px-4 h-20'>
      <Image src="/images/logo.webp" alt='logo' width={150} height={50} className='h-12 w-24'/>
        <p className="font-semibold">© 2024 E-Wallet. All Rights Reserved</p>
    </footer>
  )
}

export default Footer
