"use client"
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSort, FaSortUp, FaSortDown, FaChevronDown, FaChevronRight, FaFileExcel, FaFileWord, FaFilePdf } from 'react-icons/fa'; // Sorting and expansion icons
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import Select from 'react-select';

const DataTable = () => {
    const headerData = ["id", "name", "email", "phone"];
  const initialData = [
    { id: 1, name: "John", email: "john@gmail.com", phone: 123344556, details: "Additional info about John" },
    { id: 2, name: "Misbah", email: "misbah@gmail.com", phone: 3334554555, details: "Additional info about Misbah" },
    { id: 3, name: "Ali", email: "ali@gmail.com", phone: 263448848, details: "Additional info about Ali" },
    { id: 4, name: "Shan", email: "shan@gmail.com", phone: 674434833, details: "Additional info about Shan" },
    { id: 5, name: "John", email: "john@gmail.com", phone: 123344556, details: "Additional info about John" },
    { id: 6, name: "Misbah", email: "misbah@gmail.com", phone: 3334554555, details: "Additional info about Misbah" },
    { id: 7, name: "Ali", email: "ali@gmail.com", phone: 263448848, details: "Additional info about Ali" },
    { id: 8, name: "Shan", email: "shan@gmail.com", phone: 674434833, details: "Additional info about Shan" },
   
   
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [dataTable, setDataTable] = useState(initialData);
  const [editMode, setEditMode] = useState({ id: null, field: null });
  const [editedValue, setEditedValue] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });
  const [expandedRows, setExpandedRows] = useState(new Set()); // Manage expanded rows

  const [visibleColumns, setVisibleColumns] = useState(headerData);

  useEffect(() => {
    searchFilter(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    sortData(sortConfig.key, sortConfig.direction);
  }, [sortConfig]);

  const searchFilter = (searchQuery) => {
    let filterData = initialData;
    if (searchQuery) {
      filterData = initialData.filter(user =>
        user.id.toString().includes(searchQuery) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.toString().includes(searchQuery)
      );
    }
    setDataTable(filterData);
  };

  const sortData = (key, direction) => {
    const sortedData = [...dataTable].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setDataTable(sortedData);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(dataTable.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = dataTable.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleRowClick = (row) => {
    const isSelected = selectedRows.some(selectedRow => selectedRow.id === row.id);
    if (isSelected) {
      setSelectedRows(selectedRows.filter(selectedRow => selectedRow.id !== row.id));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
    
    toast.info(`Selected: ${row.name}`);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (selectedRows.length === currentData.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRows, currentData.length]);

  const handleEditClick = (id, field) => {
    setEditMode({ id, field });
    setEditedValue(currentData.find(row => row.id === id)[field]);
  };

  const handleValueChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleKeyPress = (e, id, field) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id, field);
    }
  };

  const handleSaveEdit = (id, field) => {
    const updatedData = dataTable.map(row =>
      row.id === id ? { ...row, [field]: editedValue } : row
    );
    setDataTable(updatedData);
    setEditMode({ id: null, field: null });
    setEditedValue("");
    setSearchQuery(""); // Remove search query after editing
    toast.success("Data updated successfully");
  };

  const handleSort = (key) => {
    const direction = sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction });
  };

  const handleRowExpansion = (id) => {
    setExpandedRows(prev => {
      const newExpandedRows = new Set(prev);
      if (newExpandedRows.has(id)) {
        newExpandedRows.delete(id);
      } else {
        newExpandedRows.add(id);
      }
      return newExpandedRows;
    });
  };

  const handleExcelExport = () => {
    const ws = XLSX.utils.json_to_sheet(dataTable);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data_table.xlsx");
  };

  const handleWordExport = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Data Table",
                  bold: true,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: dataTable.map(row => (
                new TextRun({
                  text: `${Object.values(row).join(' | ')}\n`,
                })
              )),
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'data_table.docx';
      link.click();
    });
  };

  const handlePdfExport = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: 'table' });
    doc.save('data_table.pdf');
  };
 


  
    // Column options for Select component
    const columnOptions = headerData.map(header => ({ value: header, label: header }));
  
    const handleColumnChange = (selected) => {
      setVisibleColumns(selected.map(item => item.value));
    };
  
    return (
      <>
        {/* Column Visibility Selector */}
        <div className="mb-4 flex justify-end">
          <Select
            options={columnOptions}
            value={columnOptions.filter(col => visibleColumns.includes(col.value))}
            onChange={handleColumnChange}
            isMulti
            placeholder="Select Columns"
          />
        </div>
  
        <Table className="w-[50%] m-auto mt-10">
          <TableHeader>
            <TableRow className="bg-white w-[100%] ">
              <TableHead className="w-[100px] h-[100%] py-2 flex justify-around items-center">
                {/* Search and Export Buttons */}
                {editMode.id === null && (
                  <input 
                    type="text" 
                    placeholder='search' 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='border-2 border-sky-500 focus:border-black h-8 p-2 flex justify-end'
                  />
                )}
                <div className="flex justify-self-end items-center mb-4 ml-44">
                  <div className="flex gap-2">
                    <button 
                      onClick={handleExcelExport} 
                      className="p-2 border rounded flex items-center bg-green-600 text-white"
                    >
                      <FaFileExcel className="mr-2" /> Excel
                    </button>
                    <button 
                      onClick={handleWordExport} 
                      className="p-2 border rounded flex items-center bg-sky-500 text-white"
                    >
                      <FaFileWord className="mr-2" /> Word
                    </button>
                    <button 
                      onClick={handlePdfExport} 
                      className="p-2 border rounded flex items-center bg-red-600 text-white"
                    >
                      <FaFilePdf className="mr-2" /> PDF
                    </button>
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
  
          <TableHeader>
            <TableRow className="bg-sky-600 hover:bg-sky-500">
              <TableHead>
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </TableHead>
  
              {/* Column Headers */}
              {headerData.map((header, index) => (
                visibleColumns.includes(header) && (
                  <TableHead key={index} className="font-bold text-white">
                    <span 
                      onClick={() => handleSort(header)} 
                      className="flex items-center cursor-pointer"
                    >
                      {header}
                      {sortConfig.key === header ? (
                        sortConfig.direction === "ascending" ? (
                          <FaSortUp className="ml-2" />
                        ) : (
                          <FaSortDown className="ml-2" />
                        )
                      ) : (
                        <FaSort className="ml-2" />
                      )}
                    </span>
                  </TableHead>
                )
              ))}
              <TableHead>Expand</TableHead>
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {currentData.length > 0 ? (
              currentData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <TableRow 
                    className={selectedRows.some(selectedRow => selectedRow.id === row.id) ? 'bg-blue-300' : ''} 
                    onClick={() => handleRowClick(row)}
                  >
                    <TableCell>
                      <input
                        type="radio"
                        checked={selectedRows.some(selectedRow => selectedRow.id === row.id)}
                        onChange={() => handleRowClick(row)}
                      />
                    </TableCell>
                    {headerData.map((header) => (
                      visibleColumns.includes(header) && (
                        <TableCell key={header}>
                          {editMode.id === row.id && editMode.field === header ? (
                            <input
                              type="text"
                              value={editedValue}
                              onChange={handleValueChange}
                              onKeyPress={(e) => handleKeyPress(e, row.id, header)}
                              className="border border-gray-300 p-1"
                            />
                          ) : (
                            <span 
                              onClick={() => handleEditClick(row.id, header)} 
                              className="cursor-pointer"
                            >
                              {row[header]}
                            </span>
                          )}
                        </TableCell>
                      )
                    ))}
                    <TableCell>
                      <span 
                        onClick={() => handleRowExpansion(row.id)} 
                        className="cursor-pointer flex items-center"
                      >
                        {expandedRows.has(row.id) ? (
                          <FaChevronDown className="ml-2" />
                        ) : (
                          <FaChevronRight className="ml-2" />
                        )}
                      </span>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(row.id) && (
                    <TableRow>
                      <TableCell colSpan={headerData.length + 1} className="bg-gray-200">
                        {row.details}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headerData.length + 2} className="text-center">Data not matched</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
  
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink 
                  href="#" 
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "bg-gray-900 text-white" : ""}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
  
        <ToastContainer />
      </>
    );
  }
  
  export default DataTable;
  