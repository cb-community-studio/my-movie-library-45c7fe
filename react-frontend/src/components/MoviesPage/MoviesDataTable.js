
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Rating } from 'primereact/rating';


const MoviesDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.title}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.genre}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.language}</p>
    const calendarTemplate3 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.date)} showTime ></Calendar>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.duration}</p>
    const ratingTemplate5 = (rowData, { rowIndex }) => <Rating stars={5} style={{width:"20rem"}} value={rowData.rating} cancel={false}  />

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="title" header="Title" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="genre" header="Genre" body={pTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="language" header="Language" body={pTemplate2} sortable style={{ minWidth: "8rem" }} />
            <Column field="date" header="Release Date" body={calendarTemplate3} sortable style={{ minWidth: "8rem" }} />
            <Column field="duration" header="Duration (Minutes)" body={pTemplate4} sortable style={{ minWidth: "8rem" }} />
            <Column field="rating" header="Rating" body={ratingTemplate5} sortable style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default MoviesDataTable;