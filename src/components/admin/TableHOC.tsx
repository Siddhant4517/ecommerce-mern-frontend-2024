import React from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  Column,
  usePagination,
  useSortBy,
  useTable,
  TableOptions,
  TableInstance,
  HeaderGroup,
  TableState,
} from "react-table";

interface CustomTableState<T extends object> extends TableState<T> {
  pageSize: number;
  pageIndex: number;
}

function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6,
        pageIndex: 0,
      } as Partial<CustomTableState<T>>,
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageCount,
      state,
    } = useTable<T>(options, useSortBy, usePagination) as TableInstance<T> & {
      page: any[];
      nextPage: () => void;
      previousPage: () => void;
      canNextPage: boolean;
      canPreviousPage: boolean;
      pageCount: number;
      state: CustomTableState<T>;
    };

    const { pageIndex } = state;

    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading}</h2>

        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: HeaderGroup<T>, headerGroupIdx) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIdx}>
                {headerGroup.headers.map((column, columnIdx) => (
                  <th
                    {...column.getHeaderProps(
                      (column as any).getSortByToggleProps()
                    )}
                    key={columnIdx}
                  >
                    {column.render("Header")}
                    {(column as any).isSorted && (
                      <span>
                        {(column as any).isSortedDesc ? (
                          <AiOutlineSortDescending />
                        ) : (
                          <AiOutlineSortAscending />
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, rowIdx) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={rowIdx}>
                  {row.cells.map(
                    (cell: any, cellIdx: React.Key | null | undefined) => (
                      <td {...cell.getCellProps()} key={cellIdx}>
                        {cell.render("Cell")}
                      </td>
                    )
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {showPagination && (
          <div className="table-pagination">
            <button disabled={!canPreviousPage} onClick={previousPage}>
              Prev
            </button>
            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
            <button disabled={!canNextPage} onClick={nextPage}>
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
