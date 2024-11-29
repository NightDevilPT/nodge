import { ReactFlowProvider } from '@/providers/ReactFlowContext'
import React from 'react'
import Toolbar from './toolbar/Toolbar'

const ReactFlowPlayground = () => {
  return (
	<ReactFlowProvider>
		<div className='w-full h-12'>
			<Toolbar />
		</div>
		<div className='w-full h-[500px]'>
			<ReactFlowPlayground />
		</div>
	</ReactFlowProvider>
  )
}

export default ReactFlowPlayground