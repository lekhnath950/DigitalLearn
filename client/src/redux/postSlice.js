import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentPost:null,
    loading:false,
    error:false,
    message: null
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

        likeRequest: (state) => {
            state.loading = true;
        },
        likeSuccess:(state,action)=> {
            state.loading = false;
            state.message = action.payload
        },
        likeFailure:(state,action) => {
            state.loading = false;
            state.error = action.payload;
        }


    }
})

export const {postRequest, postSuccess,postFailure, likeRequest,likeSuccess,likeFailure} = postSlice.actions

export default postSlice.reducer;