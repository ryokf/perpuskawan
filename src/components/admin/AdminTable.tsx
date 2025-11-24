import { type FC } from 'react';

interface TableColumn {
    key: string;
    label: string;
    render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface AdminTableProps {
    columns: TableColumn[];
    data: Record<string, unknown>[];
    isLoading?: boolean;
    onEdit?: (row: Record<string, unknown>) => void;
    onDelete?: (row: Record<string, unknown>) => void;
    onView?: (row: Record<string, unknown>) => void;
}

const AdminTable: FC<AdminTableProps> = ({
    columns,
    data,
    isLoading = false,
    onEdit,
    onDelete,
    onView,
}) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                            >
                                {column.label}
                            </th>
                        ))}
                        {(onEdit || onDelete || onView) && (
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className="px-6 py-4 text-sm text-gray-700"
                                >
                                    {column.render
                                        ? column.render(row[column.key], row)
                                        : String(row[column.key])}
                                </td>
                            ))}
                            {(onEdit || onDelete || onView) && (
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        {onView && (
                                            <button
                                                onClick={() => onView(row)}
                                                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                                            >
                                                View
                                            </button>
                                        )}
                                        {onEdit && (
                                            <button
                                                onClick={() => onEdit(row)}
                                                className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                onClick={() => onDelete(row)}
                                                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTable;
