import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface toogleState {
    img: Buffer | null;
}

const initialState: toogleState = {
    img: null
}

const image = createSlice({
    name: "image",
    initialState,
    reducers: {
        setImg: (state, action: PayloadAction<Buffer>) => {
            state.img = action.payload
        }
    }
});

export const { setImg } = image.actions;
export default image.reducer;