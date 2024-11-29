import { NextUIProvider } from '@nextui-org/react'
import React from 'react'

const NextUiSetup = ({children}:{children:React.ReactNode}) => {
  return (
	<NextUIProvider>
		{children}
	</NextUIProvider>
  )
}

export default NextUiSetup