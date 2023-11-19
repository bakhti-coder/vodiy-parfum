// 'use client'
import Children from '@/types/children'
import {HydrationProvider, Client} from 'react-hydration-provider'

const Provider = ({children}: Children) => {
  return (
    <HydrationProvider>
        <Client>{children}</Client>
    </HydrationProvider>
  )
}

export default Provider