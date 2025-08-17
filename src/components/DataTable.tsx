import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: number | string }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const [selectedRowIds, setSelectedRowIds] = useState<Set<number | string>>(
    new Set()
  );

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelect = (row: T) => {
    const newSet = new Set(selectedRowIds);
    if (newSet.has(row.id)) {
      newSet.delete(row.id);
    } else {
      newSet.add(row.id);
    }
    setSelectedRowIds(newSet);

    if (onRowSelect) {
      const selectedRows = data.filter((d) => newSet.has(d.id));
      onRowSelect(selectedRows);
    }
  };


  if (loading) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="p-4 text-gray-500">No data available</div>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
      <table className="w-full min-w-[600px] border-collapse text-sm md:text-base">
        <thead className="bg-gray-100">
          <tr>
            {selectable && (
              <th className="border p-2 md:p-3 whitespace-nowrap">Select</th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className="border p-2 md:p-3 cursor-pointer select-none whitespace-nowrap"
                onClick={() => col.sortable && handleSort(col.dataIndex)}
              >
                {col.title}{" "}
                {col.sortable && sortConfig.key === col.dataIndex && (
                  <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {selectable && (
                <td className="border p-2 md:p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRowIds.has(row.id)}
                    onChange={() => handleSelect(row)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="border p-2 md:p-3 whitespace-nowrap"
                >
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
