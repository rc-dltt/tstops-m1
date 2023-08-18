import { React, useState } from 'react';
import { DataTable } from 'react-native-paper';


const CustomDataTable = (props) => {

    const {
        tableTitles,
        tableData
    } = props;

    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([1, 3, 5]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, tableData.length);

    return (
        <DataTable>
            <DataTable.Header>
                {tableTitles && tableTitles.length > 0 ? (
                    tableTitles.map((title, i) => {
                        return (
                            <DataTable.Title key={i}>{title}</DataTable.Title>
                        )
                    }
                    )) : ""
                }
            </DataTable.Header>

            {tableData.slice(from, to).map((item) => (
                <DataTable.Row key={item.key}>
                    {Object.keys(item).map((key) => (
                        <DataTable.Cell key={key}>{item[key]}</DataTable.Cell>
                    ))}
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(tableData.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${tableData.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Rows Per Page'}
            />
        </DataTable>
    );
};

export default CustomDataTable;