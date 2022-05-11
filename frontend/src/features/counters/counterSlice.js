import { createSlice } from '@reduxjs/toolkit' 

const initialState = {
    value: 10
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented(state) {
            state.value++
        }
    }
})

export const { incremented } = counterSlice.actions
export default counterSlice.reducer