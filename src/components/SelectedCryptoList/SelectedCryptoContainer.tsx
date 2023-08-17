import React, { ReactNode } from 'react'

interface SelectedCryptoContainerProps {
  children: ReactNode;
}

const SelectedCryptoContainer: React.FC<SelectedCryptoContainerProps> = ({children}) => {
  return (
    <div
      className='selected-crypto-container'
    >{children}</div>
  )
}

export default SelectedCryptoContainer