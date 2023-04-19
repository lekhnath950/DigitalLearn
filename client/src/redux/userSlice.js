import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:null,
    loading:false,
    error:false,
    message:null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginRequest:(state) => {
            state.loading = true;
        },
        loginSuccess:(state,action) => {
            state.loading= false;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        loginFailure:(state,action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload.message;
        },
        logout: (state) => {
            state.user = null;
            state.loading = false;
            state.error = false;
            state.message = null;
        }
    }
})

export const {loginRequest, loginSuccess,loginFailure,logout} = userSlice.actions

export default userSlice.reducer;