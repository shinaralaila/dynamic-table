import { useState } from "react";
import React from "react";
import axios from "axios";
import Table from "./Table.component";

const Form = () => {
  const [row, setRow] = useState("");
  const [column, setColumn] = useState("");
  const [responseData, setResponseData] = useState([]);

  const [rowError, setRowError] = useState("");
  const [columnError, setColumnError] = useState("");

  const [isloading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (row > 50) {
      setRowError("Number of rows cannot exceed 50");
      return;
    }
    if (column > 5) {
      setColumnError("Number of columns cannot exceed 5");
      return;
    }
    setIsLoading(true);
    setRowError("");
    setColumnError("");

    try {
      const url = `http://localhost:8000/api/sendData?rows=${row}&columns=${column}`;
      console.log(url, "url");
      const response = await axios.post(url, {
        row,
        column,
      });
      setResponseData(response.data);
      console.log("Response from server:", response.data);

      setRow("");
      setColumn("");
      setRowError("");
      setColumnError("");
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
      setColumnError("");
      setRowError("");
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
        <h5 className="text-2xl font-bold mb-4">Create Table</h5>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="inline-full-name"
              >
                No of rows
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="number"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                required
                onChange={(e) => {
                  setRow(e.target.value);
                  setRowError("");
                  setResponseData([]);
                }}
                value={row}
              />
              {rowError && <p className="text-red-400 text-sm">{rowError}</p>}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                for="inline-password"
              >
                No of colums
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                type="number"
                class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                required
                value={column}
                onChange={(e) => {
                  setColumn(e?.target?.value);
                  setColumnError("");
                  setResponseData([]);
                }}
              />
              {columnError && (
                <p className="text-red-400 text-sm">{columnError}</p>
              )}
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                // disabled={!row || !column}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <Table data={responseData} loading={isloading} />
    </>
  );
};
export default Form;
