import React, { useMemo, useState, useRef, Suspense } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import { GrNext } from 'react-icons/gr'
import { GrPrevious } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { FiEdit2 } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import './Tables.css'

const Tables = ({ columns, rows, name, update, deleteUser }) => {
  const [keyword, setKeyword] = useState('')
  const tableRef = useRef(null)
  const dispatch = useDispatch()
  console.log(columns)
  console.log(rows)
  const [editableUserId, setEditableUserId] = useState(false)

  const filteredRows = useMemo(() => {
    return rows?.filter((row) =>
      Object?.values(row).some((val) =>
        String(val).toLowerCase().includes(keyword.toLowerCase())
      )
    )
  }, [rows, keyword])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    state: { pageIndex },
    pageCount,
    gotoPage,
  } = useTable(
    {
      columns,
      data: filteredRows,
      initialState: { pageSize: 30 },
    },
    useSortBy,
    usePagination
  )

  return (
    <>
      <section className="getUsers">
        <div className="containerSearchAndPage">
          <div className="searchExport">
            <input
              type="search"
              className="search"
              name="searchUser"
              value={keyword}
              placeholder="Search..."
              onChange={(e) => {
                setKeyword(e.target.value)
              }}
            />
          </div>
          <div className="paginationContainer">
            <button disabled={pageIndex === 0} onClick={() => gotoPage(0)}>
              First
            </button>
            <button disabled={pageIndex === 0} onClick={previousPage}>
              <GrPrevious />
            </button>
            <span>
              {pageIndex + 1} of {pageCount}
            </span>
            <button disabled={pageIndex === pageCount - 1} onClick={nextPage}>
              <GrNext />
            </button>
            <button
              disabled={pageIndex === pageCount - 1}
              onClick={() => gotoPage(pageCount - 1)}
            >
              Last
            </button>
          </div>
        </div>
        <div className="table-container">
          <table ref={tableRef} {...getTableProps()}>
            <thead>
              {headerGroups?.map((hg, i) => (
                <tr key={i} {...hg.getHeaderGroupProps()}>
                  {hg.headers?.map((header, i) => (
                    <th
                      key={i}
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                    >
                      <div className="header">
                        {header.render('Header')}
                        <span className="sortIcon">
                          {header.isSorted ? (
                            header.isSortedDesc ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )
                          ) : (
                            <FaSort style={{ opacity: '0.5' }} />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                  <th></th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page?.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()} className="row">
                    {console.log(row)}
                    {row.cells.map((cell, i) => {
                      const cellProps = cell.getCellProps()
                      return (
                        <td key={i} {...cellProps}>
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Tables
