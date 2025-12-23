import  { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table'; // Critical missing import
import { AdminMenuTable } from './AdminMenuTable';
import { Cell } from 'recharts';

interface AdminEntityViewProps<T> {
  title: string;
  data: T[];
  columns: ColumnDef<T>[]; // Requires @tanstack/react-table import
  onEdit: (item: T | null) => void;
  onDelete: (item: T) => void;
}

// Added <T extends { id: string | number }> to ensure we can use row.id
export function AdminEntityView<T extends { id: string | number }>({ 
  title, 
  data, 
  columns, 
  onEdit, 
  onDelete 
}: AdminEntityViewProps<T>) {

    
  const tableColumns = useMemo<ColumnDef<T>[]>(() => [
    ...columns,
    {
      id: "actions",
       header: "Handlinger",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-start">
          <button 
            onClick={() => onEdit(row.original)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            Rediger
          </button>
          <button 
            onClick={() => onDelete(row.original)}
            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Slet
          </button>
        </div>
      ),
    }
  ], [columns, onEdit, onDelete]);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-primaryTextColor">{title}</h2>    
      <AdminMenuTable title={title} data={data} columns={tableColumns} />
       <div>
        <button 
            onClick={() => onEdit(null)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            Tilføj
          </button>
        </div>  
    </div>
    
  );
}
