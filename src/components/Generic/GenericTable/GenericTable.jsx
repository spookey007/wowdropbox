import { formatDate } from "../../../utils/useFunc";
import Loader from "../Loader";
import NoData from "../NoData";

const GenericTable = ({ columns = [], data = [], isLoading, noDataTitle }) => {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full text-left p-4 ">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-6 py-4 text-sm font-bold text-[var(--main-text)] bg-[var(--card-bg)]"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="transition-all duration-300">
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center"
                style={{ height: "300px" }}
              >
                <div className="flex justify-center items-center h-full bg-[var(--card-bg)]">
                  <Loader />
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center px-6 py-4 text-sm text-[var(--main-text)] bg-[var(--card-bg)] h-[400px]"
              >
                <NoData title={noDataTitle || "data"} />
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-[var(--card-bg)] text-[var(--main-text)]"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 text-sm font-semibold"
                  >
                    {col.render
                      ? col.render(row)
                      : col.accessor === "date"
                      ? formatDate(row[col.accessor])
                      : col.accessor === "amount"
                      ? `$ ${Number(row[col.accessor].toFixed(2))}`
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
