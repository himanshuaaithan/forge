import { createSlice } from '@reduxjs/toolkit'

const sandboxslice = createSlice({
    name: 'snadbox',
    initialState: {
        url: ''
    },
    reducers: {
        setUrl: (state, action) => {
            state.url = action.payload
        }
    }
})

export const { setUrl } = sandboxslice.actions
export default sandboxslice.reducer