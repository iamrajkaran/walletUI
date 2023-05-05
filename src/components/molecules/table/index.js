import './index.css';
import { useState, } from 'react';
import { CSVLink } from 'react-csv';

const Table = (props) => {
    const { data, setData, schema, } = props;

    // Get/Set States
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    // Sort data by field
    const sortData = (field) => {
      const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
      setSortField(field);
      setSortOrder(order);

      if (field === 'date') {
        setData(
          data.slice().sort((a, b) => {
            let first = new Date(a.date);
            let second = new Date(b.date);
            return order === "asc" ? first - second : second - first
          })
        );
      } else {
        setData(
          data.slice().sort((a, b) =>
            order === "asc" ? a[field] - b[field] : b[field] - a[field]
          )
        );
      }
    };

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Change items per page
    const handleItemsPerPageChange = (event) => {
      setItemsPerPage(parseInt(event.target.value));
      setCurrentPage(1);
    };

    const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
      const pageNumbers = [];

      for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
      }

      return (
        <div>
          {pageNumbers.map((number) => (
            <button key={number} onClick={() => paginate(number)}>
              {number}
            </button>
          ))}
        </div>
      );
    };

    return (
      <div>
        {
          <CSVLink data={currentItems} headers={schema.headers}>
            Download CSV
          </CSVLink>
        }
        {
          <table>
            <thead>
              <tr>
                {
                    schema.map((item, index) => <th key={index} onClick={item.isSort ? (() => sortData(item.key)): () => {}}>{item.label}</th>)
                }
              </tr>
              {/* <th onClick={() => sortData("amount")}>Amount ↨</th> */}
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  {
                      schema.map((schemaItem, index) => <td key={index}>{item[schemaItem.key]}</td>)
                  }
                </tr>
              ))}
            </tbody>
          </table>
        }
        <div>
        <label htmlFor="itemsPerPage">Items per page:</label>
          <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          paginate={paginate}
        />
      </div>
    );
};

export default Table;
