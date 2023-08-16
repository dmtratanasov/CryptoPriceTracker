import React, { ReactNode } from 'react'

interface SelectedCryptoContainerProps {
  children: ReactNode;
}

const SelectedCryptoContainer: React.FC<SelectedCryptoContainerProps> = ({children}) => {
  return (
    <div
      style={{
        width: "100%", display: "flex", flexDirection:'column'
      }}
    >{children}</div>
  )
}

export default SelectedCryptoContainer