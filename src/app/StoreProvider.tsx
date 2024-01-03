"use client"
import React from 'react'
import { store } from '@/lib/store'
import { Provider } from 'react-redux'

const storeProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>
}

export default storeProvider