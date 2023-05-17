import moment from "moment";

export const Table = ({
  tableData,
  tableHeaders,
  showButtons,
  deleteFunction=()=>{},
  fieldsMap,
}) => {
  return (
    <div className="flex flex-col my-5">
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div className="overflow-scroll border rounded-l">
            <table className="min-w-full divide-y divide-grey-300">
              <thead className="bg-gray-100">
                <tr>
                  {tableHeaders.map((header) => {
                    return (
                      <th
                        scope="col"
                        className="px-5 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        {header}
                      </th>
                    );
                  })}

                  {showButtons && (
                    <th
                      scope="col"
                      className="px-5 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    ></th>
                  )}
                  {showButtons && (
                    <th
                      scope="col"
                      className="px-5 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    ></th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableData.map((tableRow) => {
                  return (
                    <tr>
                      {fieldsMap.map((tableEntry) => {
                        return (
                          <td className="px-5 py-4 text-sm font-normal text-gray-00 whitespace-nowrap capitalize">
                            {tableRow[tableEntry]}
                          </td>
                        );
                      })}

                      {showButtons && (
                        <td
                          className="px-5 py-4 text-sm font-bold text-right whitespace-nowrap"
                          onClick={() => {
                            deleteFunction(tableRow["id"]);
                          }}
                        >
                          <a
                            className="text-red-500 hover:text-red-700"
                            href="#"
                          >
                            Delete
                          </a>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
