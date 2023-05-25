import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    error: false,
    message: null,
    discus: []
}

export const discSlice = createSlice({
    name: 'discc',
    initialState,
    reducers: {
        discRequest: (state) => {
            state.loading = true;
        },
        discSuccess: (state,action) => {
            state.loading = false;
            state.discus = action.payload;
        },
        discFailure:(state,action) => {
            state.loading = false;
            state.error = action.payload
        },
        // clearDiscussions: (state,action) => {
        //     return state.filter((discussion) => discussion._id !== action.payload);
        //   }
    }
})

export const {discRequest, discSuccess, discFailure} = discSlice.actions
export default discSlice.reducer;