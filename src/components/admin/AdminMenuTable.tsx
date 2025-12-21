import React, { useMemo } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender, 
  type ColumnDef 
} from '@tanstack/react-table';

/* interface AdminEntityViewProps<T> {
  title: string;
  data: T[];
  columns: ColumnDef<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
} */

interface AdminEntityViewProps<T> {
  title: string;
  data: T[];
  columns: ColumnDef<T>[]; 
}

export function AdminMenuTable<T extends { id: string | number }>({ 
  title, 
  data, 
  columns, 
  
}: AdminEntityViewProps<T>) {

  // 1. Add the Actions column dynamically
 /*  const tableColumns = useMemo<ColumnDef<T>[]>(() => [
    ...columns,
    {
      id: 'actions',
      header: 'Handlinger',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button onClick={() => onEdit(row.original)} className="text-blue-600">Rediger</button>
          <button onClick={() => onDelete(row.original)} className="text-red-600">Slet</button>
        </div>
      ),
    }
  ], [columns, onEdit, onDelete]); */

  // 2. Initialize the table logic
  const table = useReactTable({
    data,
    // columns: tableColumns,
     columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 3. Render the UI (cannot just render {data})
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="text-left border-b p-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-2 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
