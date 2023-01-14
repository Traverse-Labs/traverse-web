import { ReactNode } from "react";

export type DataTableRows = {
  cells: ReactNode[];
  rowKey?: string;
  onRowClick?: () => void;
}[];

export type ColumnDef<T> = {
  name: string; // Display as column header
  renderCustomName?: (dataSource: T[]) => ReactNode | null; // Render a custom name
  columnKey: string; // Unique key used to identify the column
  renderCell: (item: T) => JSX.Element | null; // Given the data from source, render the cell
  getCompareValue?: (item: T) => number | string; // Transform each data item into a value for sorting
};

export type RowDef<T> = {
  getRowKey: (item: T) => string; // Unique key used to render each row
  getRowClick?: (item: T) => void;
};
