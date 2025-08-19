import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  // console.log(response);
  // console.log(response.json());

  return response.json();
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    error: null,
    loading: false,
  },
  reducers: {
    removePost: (state, action) => {
      state.data = state.data.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = "failed to fetch posts";
      });
  },
});

export const { removePost } = postsSlice.actions;

export default postsSlice.reducer;
