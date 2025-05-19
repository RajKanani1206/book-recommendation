import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import BooksList from "./pages/BooksList";
import AuthorizeUser from "./middleware/Auth";
import BookDetails from "./pages/BookDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/books"
          element={
            <AuthorizeUser>
              <BooksList />
            </AuthorizeUser>
          }
        />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
