import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        token:null
    },
    reducers:{
        setUser(state,action)
        {
            state.user = action.payload;
        },

        setToken(state,action){
            state.token = action.payload
        },
        logout(state,action)
        {
            state.token = null;
            state.user = null;
        },
        setUserVerified: (state, action) => {
            if (state.user) {
              state.user.verified = action.payload.verified;
            }
          }
    }
});
export const {setToken,setUser,logout,setUserVerified} = authSlice.actions;
export default authSlice.reducer;