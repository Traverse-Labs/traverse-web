import { Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { ArrayUtil } from "utils";

import { ColumnDef, RowDef } from "./DataTable.type";
import { getNewSortDirection, sortSourceData } from "./DataTable.util";

type Props<T> = {
  dataSource: T[]; // Generic type T refers to the type of each item in dataSource
  columnDefs: ColumnDef<T>[]; // Column definitions
  rowDef: RowDef<T>; // Row definitions
  size?: "sm" | "lg"; // Indicate the padding surrounding content of table
  rounded?: boolean; // Flag to indicate the style of the table
  tableBottomRef?: (_node?: Element | null) => void | null; // Use to detect when the bottom of the table is in view
  isTableBottomInView?: boolean; // Flag to indicate the table bottom is in view
  defaultSortedColumn?: string; // Default column for sorting
  defaultSortedDirection?: ArrayUtil.SortDirection; // Default sort direction
};

const DataTable = <T,>(props: Props<T>) => {
  const {
    columnDefs,
    rowDef,
    dataSource,
    size = "sm",
    rounded = false,
    tableBottomRef = null,
    defaultSortedColumn = "",
    defaultSortedDirection = ArrayUtil.SortDirection.Desc,
    isTableBottomInView,
  } = props;

  const [sortedData, setSortedData] = useState<T[]>(dataSource);
  const [sortedColumn, setSortedColumn] = useState<string>(defaultSortedColumn);
  const [sortDirection, setSortDirection] = useState<ArrayUtil.SortDirection>(
    defaultSortedDirection
  );

  useEffect(() => {
    // Reset to default sorting whenever the bottom of the table is in view
    if (tableBottomRef && isTableBottomInView) {
      setSortedColumn(defaultSortedColumn);
      setSortDirection(defaultSortedDirection);
    }
  }, [
    defaultSortedColumn,
    defaultSortedDirection,
    isTableBottomInView,
    tableBottomRef,
  ]);

  useEffect(() => {
    const sortedArray = sortSourceData(
      dataSource,
      columnDefs,
      sortedColumn,
      sortDirection
    );

    setSortedData(sortedArray);
  }, [columnDefs, dataSource, sortedColumn, sortDirection]);

  const handleColumnCellClick = (columnKey?: string) => {
    if (columnKey !== sortedColumn) {
      setSortedColumn(columnKey ?? "");
      setSortDirection(ArrayUtil.SortDirection.Desc);
      return;
    }

    setSortDirection(getNewSortDirection(sortDirection));
  };

  const { getRowKey, getRowClick } = rowDef;

  const sizeClasses =
    size === "sm" ? "px-1 py-2 text-xs lg:text-sm" : "px-3 py-4";

  if (!sortedData) {
    return null;
  }

  const getChevronIcon = (column: ColumnDef<T>) => {
    if (!column.getCompareValue) {
      return null;
    }

    if (column.columnKey === sortedColumn) {
      const icon = {
        [ArrayUtil.SortDirection.Asc]: (
          <ChevronUpIcon className="h-4 w-4 text-teal-400" />
        ),
        [ArrayUtil.SortDirection.Desc]: (
          <ChevronDownIcon className="h-4 w-4 text-teal-400" />
        ),
      };

      return icon[sortDirection];
    }

    return <ChevronUpDownIcon className="h-4 w-4" />;
  };

  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="shadow-sm ring-1 ring-black ring-opacity-5">
          <Transition show={true} appear={true}>
            <table className="min-w-full">
              <thead className="bg-slate-800 text-slate-50">
                <tr>
                  {columnDefs.map((column, index) => (
                    <th
                      key={`header-${column.columnKey}`}
                      scope="col"
                      className={clsx(
                        "sticky top-0 z-10 bg-slate-800 text-left text-sm font-semibold text-slate-50 ",
                        sizeClasses,
                        index === 0 &&
                          clsx("pl-4 pr-3 sm:pl-6", rounded && "rounded-l-lg"),
                        index === columnDefs.length - 1 &&
                          clsx("pl-3 pr-4 sm:pr-6", rounded && "rounded-r-lg"),
                        column.getCompareValue && "cursor-pointer"
                      )}
                      onClick={() =>
                        column.getCompareValue &&
                        handleColumnCellClick(column.columnKey)
                      }
                    >
                      <div className="group inline-flex items-center gap-1">
                        <span className="whitespace-nowrap">
                          {column.renderCustomName
                            ? column.renderCustomName(dataSource)
                            : column.name}
                        </span>
                        {getChevronIcon(column)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-50">
                {sortedData.map((dataSourceItem, dataSourceItemIndex) => {
                  const rowKey = getRowKey(dataSourceItem);

                  const ref =
                    dataSourceItemIndex === sortedData.length - 3
                      ? tableBottomRef
                      : null;

                  return (
                    <tr
                      key={`row-${rowKey}`}
                      className={clsx(
                        "transition hover:bg-slate-800/20",
                        getRowClick && "cursor-pointer"
                      )}
                      onClick={() => getRowClick && getRowClick(dataSourceItem)}
                      ref={ref}
                    >
                      {columnDefs.map((column, j) => {
                        return (
                          <td
                            key={`row-cell-${rowKey}-${column.columnKey}`}
                            className={clsx(
                              "whitespace-nowrap pr-4 text-sm",
                              sizeClasses,
                              j === 0 && "pl-4 pr-3 sm:pl-6",
                              j === columnDefs.length - 1 && "pl-3 pr-4 sm:pr-6"
                            )}
                          >
                            <Transition.Child
                              enter="transition ease duration-500 transform"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                            >
                              {column.renderCell(dataSourceItem)}
                            </Transition.Child>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
