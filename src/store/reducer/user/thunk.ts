import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTest = createAsyncThunk(
    "user/fetchUser",
    async (payload: object, thunkAPI) => {
        return payload;

        // const response = await axios.get(`https://api.example.com/user/${userId}`);
        // return response.data;
    },
);
