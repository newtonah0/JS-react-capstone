import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const url =
// "https://cors-anywhere.herokuapp.com/https://www.fruityvice.com/api/fruit/all";
const url = 'https://api.allorigins.win/raw?url=https://www.fruityvice.com/api/fruit/all';
// const urlf =
//   "https://cors-anywhere.herokuapp.com/https://www.fruityvice.com/api/fruit/family/";
const urlf = 'https://api.allorigins.win/raw?url=https://www.fruityvice.com/api/fruit/family/';
export const getFruits = createAsyncThunk(
  'fruits/getFruits',
  async (payload, thunkAPI) => {
    try {
      const resp = await fetch(url)
        .then((resp) => resp.json())
        .then((data) => data);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getFruitsFamily = createAsyncThunk(
  'fruits/getFruitsFamily',
  async (payload, thunkAPI) => {
    try {
      if (payload === '') {
        const resp = await fetch(url)
          .then((resp) => resp.json())
          .then((data) => data);
        return resp;
      }
      const resp = await fetch(urlf + payload)
        .then((resp) => resp.json())
        .then((data) => data);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  fruits: [],
  fruitsFilter: [],
  isLoading: false,
  error: null,
};

const fruitsSlice = createSlice({
  name: 'fruitCategories',
  initialState,
  reducers: {
    getSearch: (state, { payload }) => {
      state.fruitsFilter = payload;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [getFruits.pending]: (state) => {
      state.isLoading = true;
    },
    [getFruits.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.fruits = payload;
    },
    [getFruits.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [getFruitsFamily.pending]: (state) => {
      state.isLoading = true;
    },
    [getFruitsFamily.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.error) {
        state.fruits = [];
      } else {
        state.fruits = payload;
      }
    },
    [getFruitsFamily.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { getSearch } = fruitsSlice.actions;
export default fruitsSlice.reducer;
