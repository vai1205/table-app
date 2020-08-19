import React from 'react';
import DraggableTable from './DraggableTable';
import MyNavbar from './MyNavbar';
const TablePage = () => {
    return (
        <>
            <div className="table-page">
                <MyNavbar />
                <div className="table-grid">
                <DraggableTable />
                <DraggableTable />
                <DraggableTable />
                </div>
            </div>
        </>
    )
}
export default TablePage;