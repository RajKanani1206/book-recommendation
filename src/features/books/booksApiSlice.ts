import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BooksApiResponse } from '../../types/book';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.googleapis.com/books/v1/' }),
  endpoints: (builder) => ({
    getBooks: builder.query<BooksApiResponse, void>({
      query: () => 'volumes?q=subject:fiction',
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
