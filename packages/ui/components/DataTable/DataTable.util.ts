import { ArrayUtil } from "utils";

import { ColumnDef } from "./DataTable.type";

export function sortSourceData<T>(
  dataSource: T[],
  columnDefs: ColumnDef<T>[],
  sortedColumn: string,
  sortDirection: ArrayUtil.SortDirection
) {
  if (!dataSource?.length) {
    return dataSource;
  }

  const columnDefinition: ColumnDef<T> | undefined = columnDefs.find(
    (column) => column.columnKey === sortedColumn
  );

  if (!columnDefinition || !columnDefinition.getCompareValue) {
    return dataSource;
  }

  const dataSourceWithComparisonValue = dataSource.map((data) => {
    return {
      ...data,
      compareValue: columnDefinition.getCompareValue(data),
    };
  });

  return ArrayUtil.sortArray(
    dataSourceWithComparisonValue,
    "compareValue",
    sortDirection
  );
}

export function getNewSortDirection(
  currentDirection: ArrayUtil.SortDirection
): ArrayUtil.SortDirection {
  switch (currentDirection) {
    case ArrayUtil.SortDirection.Desc:
      return ArrayUtil.SortDirection.Asc;

    case ArrayUtil.SortDirection.Asc:
      return ArrayUtil.SortDirection.Desc;
  }
}
