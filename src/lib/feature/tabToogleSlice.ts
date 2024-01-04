import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StaticImageData } from 'next/image';

interface toogleState {
    img: StaticImageData | null;
}

const initialState: toogleState = {
    img: null
}

const image = createSlice({
    name: "image",
    initialState,
    reducers: {
        setImg: (state, action: PayloadAction<StaticImageData>) => {
            state.img = action.payload
        }
    }
});

export const { setImg } = image.actions;
export default image.reducer;