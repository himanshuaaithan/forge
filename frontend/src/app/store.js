import { configureStore } from '@reduxjs/toolkit'
import sandboxReducer from '../features/Forge/state/sandboxSlice.js'

export const store = configureStore({
    reducer: {
        sandboxReducer
    }
})