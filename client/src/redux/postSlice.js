import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentPost:null,
    loading:false,
    error:false
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{
        postRequest:(state) => {
            state.loading = true;
        },
        postSuccess:(state,action) => {
            state.loading= false;
            state.currentPost = action.payload;
        },
        postFailure:(state) => {
            state.loading = false;
            state.error = true
        },

    }
})

export const {postRequest, postSuccess,postFailure} = postSlice.actions

export default postSlice.reducer;