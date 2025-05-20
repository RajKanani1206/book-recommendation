import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
  ColDef,
  ValueFormatterParams,
  RowDoubleClickedEvent,
} from "ag-grid-community";
import { Spin } from "antd";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useGetBooksQuery } from "../features/books/booksApiSlice";
import { BooksApiResponse } from "../types/book";

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  id: string;
  title: string;
  author?: string;
  genre?: string;
  rating?: number;
}

const valueFormatter = (params: ValueFormatterParams<RowData>): string => {
  const val = params.value;
  return typeof val === "number" ? val.toFixed(1) : val ?? "-";
};

const BooksList: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBooksQuery() as {
    data?: BooksApiResponse;
    isLoading: boolean;
    isError: boolean;
  };
  const [searchText, setSearchText] = useState<string>("");

  const handleRowDoubleClick = (event: RowDoubleClickedEvent<RowData>) => {
    const bookId = event.data?.id;
    if (bookId) {
      navigate(`/book/${bookId}`);
    }
  };

  const rowData: RowData[] = useMemo(() => {
    if (!data?.items) return [];
    return data.items
      .filter((item) =>
        [item.volumeInfo.title, item.volumeInfo.authors?.join(", ") || ""]
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
      .map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(", "),
        genre: item.volumeInfo.categories?.join(", "),
        rating: item.volumeInfo.averageRating,
      }));
  }, [data, searchText]);

  const columnDefs = useMemo<ColDef<RowData>[]>(
    () => [
      { headerName: "Title", field: "title", valueFormatter },
      { headerName: "Author", field: "author", valueFormatter },
      { headerName: "Genre", field: "genre", valueFormatter },
      { headerName: "Avg Rating", field: "rating", valueFormatter },
    ],
    []
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }
  if (isError) return <div>Error loading books</div>;

  return (
    <div className="min-h-screen p-10">
      <h3 className="text-3xl font-medium text-center pb-10">Books List</h3>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-5 p-5 w-xs border border-slate-300 rounded-lg focus:outline-none"
      />
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact<RowData>
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
          onRowDoubleClicked={handleRowDoubleClick}
        />
      </div>
    </div>
  );
};

export default BooksList;
