import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// initial state for apiQuerySlice
const initialState = {
  apiQueryResults: [],
}

// should be server port(8000) - client connects to server which connects to 3rd party API securely
const baseUrl = `http://localhost:8000/search`


// measureables for user input of food type, measure and amount
const amtInput = "";
const measType = "";
const foodItem = "";

export const fetchApiQueryResults = createAsyncThunk(
  'reducers/fetchApiQueryResults', async (url, thunkApi) => {
    try {
      let response = undefined;
      response = await axios.get(`${baseUrl}${url}`);
      return response;
    } catch(err) {
      if(!err?.response){
        throw err;
      }
      return thunkApi.rejectWithValue({ err: 'Error with food item search'});
    }
})

const apiQuerySlice = createSlice({
  name: 'apiQuery',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiQueryResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApiQueryResults.fulfilled, (state, action) => {
        state.apiQueryResults = action.payload.data;
        state.loading = false;
        state.failed = false;
      })
      .addCase(fetchApiQueryResults.rejected, (state, action) => {
        state.apiQueryResults = undefined;
        state.loading = false;
        state.failed = true;
        state.error = action?.payload;
      })
  }
});

export default apiQuerySlice.reducer;