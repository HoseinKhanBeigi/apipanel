import React, {useState} from "react";
import {FormControl, MenuItem, Select} from "@mui/material";


export default function RowPerPage({ onPageChange }) {

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        onPageChange(newRowsPerPage);
    };

    return (
        <FormControl style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            direction: 'rtl',
            alignItems: 'center',
            gap: '11px'
        }}>
            <div>ردیف در هر صفحه:</div>
            <Select  labelId="rows-per-page"  id="rows-per-page" value={rowsPerPage} onChange={handleRowsPerPageChange}>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="100">100</MenuItem>
            </Select>
        </FormControl>
    );

}