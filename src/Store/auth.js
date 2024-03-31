import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem("token"),
    userEmail : localStorage.getItem("userEmail"),
    isLogggedIn : localStorage.getItem("isLoggedIn"),
    isPremium : ""
};

const authSlice = createSlice({
    name : "authentication",
    initialState,
    reducers : {
        login(state,action) {
            state.token = action.payload.tokenId;
            state.userEmail = action.payload.email;
            localStorage.setItem("token" , action.payload.tokenId);
            localStorage.setItem("userEmail" , action.payload.email);
            state.isLogggedIn = true;
            localStorage.setItem("isLoggedIn" , true);
        },
        
        logout(state) {
            state.token = null;
            state.userEmail = null;
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            state.isPremium = false;
            state.isLogggedIn = false;
            localStorage.removeItem("isDark");
            localStorage.removeItem("isPremium");
            localStorage.removeItem("isLoggedIn");
        },

        setIsPremium(state) {
            state.isPremium = true;
        }

    }
})


export const authActions = authSlice.actions;
export default authSlice.reducer;