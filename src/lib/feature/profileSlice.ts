import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { user } from '../types';

interface profileState {
    user: user;
    loading: boolean;
}

const initialState: profileState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
    loading: false
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<user>) => {
            state.user = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;