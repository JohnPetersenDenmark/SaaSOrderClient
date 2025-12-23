import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender, 
  type ColumnDef 
} from '@tanstack/react-table';

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

  // 2. Initialize the table logic
  const table = useReactTable({
    data,
    // columns: tableColumns,
     columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 3. Render the UI (cannot just render {data})
  return (
    <>
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
    </>
  );
}
