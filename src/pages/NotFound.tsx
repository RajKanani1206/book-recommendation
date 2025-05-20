import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="mb-4 text-gray-600">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/books" className="text-blue-500 underline">
        Go back to Book List
      </Link>
    </div>
  );
};

export default NotFound;
