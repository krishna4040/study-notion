import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type signupData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    accountType: string;
}

interface authState {
    token: string | null;
    signupData: signupData | null;
    loading: boolean;
}

const initialState: authState = {
    token: typeof window !== 'undefined' && localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null,
    signupData: null,
    loading: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignupData: (state, action: PayloadAction<signupData>) => {
            state.signupData = action.payload
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    },
});

export const { setToken, setSignupData, setLoading } = authSlice.actions;
export default authSlice.reducer;