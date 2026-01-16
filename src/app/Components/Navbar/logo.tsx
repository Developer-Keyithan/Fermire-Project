import React from 'react'
import Image from 'next/image'
import FermireLogo from '../../Assets/logo.svg'

const Logo = () => {
  return (
    <div>
      <Image
        src={FermireLogo}
        alt="Fermire Logo"
        className="h-full max-h-16 w-auto" 
      />
    </div>
  )
}

export default Logo