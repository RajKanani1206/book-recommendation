import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReviewState {
  [bookId: string]: {
    rating: number;
    review: string;
    averageRating: number;
    ratingsCount: number;
  };
}

const initialState: ReviewState = {};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (
      state,
      action: PayloadAction<{ bookId: string; rating: number; review: string; averageRating: number; ratingsCount: number; }>
    ) => {
      const { bookId, rating, review, averageRating, ratingsCount } = action.payload;

      const newRatingsCount = (ratingsCount || 0) + 1;
      const newTotalRating = (averageRating * ratingsCount) + rating;
      const newAverageRating = newTotalRating / newRatingsCount;

      state[bookId] = { rating, review, ratingsCount: newRatingsCount, averageRating: newAverageRating };
    },
  },
});

export const { addReview } = reviewSlice.actions;
export default reviewSlice.reducer;
