import React from "react";
import { useParams } from "react-router-dom";
import { Rate, Input, Button, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useGetBooksQuery } from "../features/books/booksApiSlice";
import { addReview } from "../features/reviews/reviewSlice";
import { BookItem, BooksApiResponse } from "../types/book";
import "./style.css";

const { TextArea } = Input;

const BookDetails: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetBooksQuery() as {
    data?: BooksApiResponse;
    isLoading: boolean;
  };
  const reviewData = useAppSelector((state) => state.reviews[bookId || ""]);

  const [rating, setRating] = React.useState<number>(0);
  const [review, setReview] = React.useState<string>("");

  const book: BookItem | undefined = data?.items.find((item) => item.id === bookId);

  if (isLoading || !book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const handleSubmit = () => {
    if (!bookId) return;
    dispatch(addReview({ bookId, rating, review, averageRating: averageRating || 0, ratingsCount: ratingsCount || 0 }));
  };

  const { title, authors, description, imageLinks, averageRating, ratingsCount } = book.volumeInfo;
  const displayAverage = reviewData?.averageRating ?? averageRating ?? 0;
  const displayCount = reviewData?.ratingsCount ?? ratingsCount ?? 0;
  const isSubmitted = !!reviewData;

  return (
    <div className="min-h-screen">
      <div className="py-20 mx-50">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {imageLinks?.thumbnail && <img src={imageLinks.thumbnail} alt={title} className="w-90 h-110 rounded" />}
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-gray-600">{authors?.join(", ")}</p>
            <div className="flex items-center my-5">
              <Rate disabled allowHalf value={displayAverage} className="rating-icon" />
              {displayAverage > 0 && <span className="ml-5 font-medium text-3xl">{displayAverage.toFixed(2)}</span>}
              <span className="ml-5 text-gray-600">({displayCount} ratings)</span>
            </div>
            <p className="text-sm text-gray-700">{description || "No description available."}</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Ratings & Reviews</h2>
          {!isSubmitted ? (
            <>
              <div className="flex flex-col items-center">
                <Rate value={rating} onChange={setRating} className="rating-icon" />
                <label className="my-1 font-medium">Rate this book</label>
              </div>
              <div>
                <label className="mb-1 font-medium">Review:</label>
                <TextArea
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your thoughts about this book..."
                />
              </div>
              <Button
                type="primary"
                onClick={handleSubmit}
                className="login-btn"
                disabled={rating === 0 || review.trim().length === 0}
              >
                Submit Review
              </Button>
            </>
          ) : (
            <>
              <Rate value={reviewData.rating} disabled className="rating-icon" />
              <p className="text-gray-700 my-3">{reviewData.review}</p>
              <div className="text-green-600 font-medium">✓ Review submitted</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
