import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import BooksList from "./pages/BooksList";
import AuthorizeUser from "./middleware/Auth";
import BookDetails from "./pages/BookDetails";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/books"
          element={
            <AuthorizeUser>
              <BooksList />
            </AuthorizeUser>
          }
        />
        <Route
          path="/book/:bookId"
          element={
            <AuthorizeUser>
              <BookDetails />
            </AuthorizeUser>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
