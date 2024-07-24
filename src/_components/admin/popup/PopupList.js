'use client'
import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {usePopupListQuery} from "@/hook/admin/usePopupQuery";
import Loader from "@/components/common/loader/Loader";
import dayjs from "dayjs";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import {Checkbox} from "@mui/material";


const PopupList = ({columns, data, isLoading, isSuccess, selected, setSelected}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleChangePage = (event, newPage) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("pageNum", newPage + 1)
        replace(`${pathname}?${params.toString()}`);
    };
    //
    const handleChangeRowsPerPage = (event) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("pageSize", event.target.value)
        replace(`${pathname}?${params.toString()}`);
    };

    const handleSelectAllClick = (e) => {
        if (e.target.checked) {
            const newSelected = data.list.map((popup) => popup.popupId);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    return (
        <>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                {isSuccess && (
                                    <Checkbox
                                        color="primary"
                                        indeterminate={selected.length > 0 && selected.length < data.list.length}
                                        checked={data.list.length > 0 && selected.length === data.list.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                )}
                            </TableCell>
                            <TableCell
                            >
                                No.
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading &&
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Loader/>
                                </TableCell>
                            </TableRow>
                        }
                        {
                            (!isLoading && isSuccess) && (
                                data?.list?.map((item, i) => {
                                    const isItemSelected = isSelected(item.popupId);
                                    const labelId = `enhanced-table-checkbox-${i}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, item.popupId)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={`popup_${item.popupId}`}
                                            selected={isItemSelected}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {data?.startRow + i}
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`${pathname}/write?popupId=${item.popupId}`}>{item.title}</Link>
                                            </TableCell>
                                            <TableCell>
                                                {item.start}
                                            </TableCell>
                                            <TableCell>
                                                {item.end}
                                            </TableCell>
                                            <TableCell>
                                                {item.pcYn}
                                            </TableCell>
                                            <TableCell>
                                                {item.mobileYn}
                                            </TableCell>
                                            <TableCell>
                                                {item.regDate}
                                            </TableCell>
                                        </TableRow>)
                                })
                            )
                        }
                        {
                            (!isLoading && isSuccess && data?.list.length == 0) &&
                            <TableRow><TableCell colSpan={columns.length + 2} align={"center"}>데이터가
                                없습니다</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                labelRowsPerPage={"페이지 당"}
                component="div"
                count={data?.total}
                rowsPerPage={searchParams.get("pageSize") ?? 10}
                page={searchParams.has("pageNum") ? searchParams.get("pageNum") - 1 : 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default PopupList;
