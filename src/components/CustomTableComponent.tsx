import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

interface CustomTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: () => void;
  hidePagination?: boolean;
}

export type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

const CustomTableComponent = <T extends object>({
  data,
  columns,
  onPaginationChange,
  // pagination,
  pageCount,
  hidePagination,
}: CustomTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    pageCount: pageCount,
    rowCount: 10,
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden p-2">
              <table className="w-full text-center">
                <thead className="">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      className="text-primary bg-gray-100"
                      key={headerGroup.id}
                    >
                      {headerGroup.headers.map((header, idx) => (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className={` pl-2 px-1 text-start py-3 text-sm  font-bold text-primary   ${
                            idx == 0 && "rounded-l-lg"
                          } ${
                            idx == headerGroup.headers.length - 1 &&
                            "rounded-r-lg"
                          }
                          `}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-solid border-gray-300 bg-white"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          className=" pl-2 text-start whitespace-nowrap  py-2 text-sm font-light"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* pagination */}
        <div>
          <div className={`flex justify-between ${hidePagination && "hidden"}`}>
            <div>
              <span>{`Page ${
                table.getState().pagination.pageIndex + 1
              } of ${table.getPageCount()}`}</span>
            </div>
            <div className="flex  justify-start">
              <div className="flex flex-row gap-2 ">
                <button
                  className="p-0 w-9 h-9 border rounded-md border-primary-color text-primary hover:border-primary-color"
                  disabled={!table.getCanPreviousPage()}
                  onClick={table.previousPage}
                >
                  <ArrowBackIosRoundedIcon
                    style={{ fontSize: "12px", color: "var(--primary-color)" }}
                  />
                </button>
                <button
                  className="p-0 w-9 h-9 text-xs rounded-md text-white border border-primary-color
                hover:border-gray-400 bg-primary-color"
                >
                  {table.getState().pagination.pageIndex + 1}
                </button>

                <button
                  className="p-0 w-9 h-9 border-[2px] rounded-md border-primary-color text-primary hover:border-primary-color"
                  disabled={!table.getCanNextPage()}
                  onClick={table.nextPage}
                >
                  <ArrowForwardIosRoundedIcon
                    style={{ fontSize: "12px", color: "var(--primary-color)" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomTableComponent;
