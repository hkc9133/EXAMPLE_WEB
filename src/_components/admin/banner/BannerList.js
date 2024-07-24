'use client'

import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Loader from "@/components/common/loader/Loader";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import {Checkbox} from "@mui/material";
import Image from "next/image";

const BannerList = ({banner,isLoading,isSuccess,selected,setSelected,columns}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace, push} = useRouter();

    const isSelected = (id) => selected.indexOf(id) !== -1;

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


    const handleSelectAllClick = (e) => {
        if (e.target.checked) {
            const newSelected = banner.list.map((banner) => banner.bannerId);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("pageNum", newPage + 1)
        replace(`${pathname}?${params.toString()}`);
    };

    const handleChangeRowsPerPage = (event) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("pageSize", event.target.value)
        replace(`${pathname}?${params.toString()}`);
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
                                        indeterminate={selected.length > 0 && selected.length < banner.list.length}
                                        checked={banner.list.length > 0 && selected.length === banner.list.length}
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
                                <TableCell colSpan={columns.length + 1}>
                                    <Loader/>
                                </TableCell>
                            </TableRow>
                        }
                        {
                            (!isLoading && isSuccess) && (
                                banner.list.map((item, i) => {
                                    const isItemSelected = isSelected(item.bannerId);
                                    const labelId = `enhanced-table-checkbox-${i}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, item.bannerId)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={`banner_${item.bannerId}`}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
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
                                                {banner.startRow + i}
                                            </TableCell>
                                            <TableCell>
                                                {item.bannerFileList.map((item) => {
                                                    return <Image key={`${item.fileId}_thumb`}
                                                                  width={100}
                                                                  height={100}
                                                                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/resource${item.filePath}/${item.fileName}`}/>
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                onClick={(e) =>{e.stopPropagation()}}
                                                    href={`${pathname}/write?bannerId=${item.bannerId}`}>{item.bannerTitle}</Link>
                                            </TableCell>
                                            <TableCell>
                                                {item.url}
                                            </TableCell>
                                            <TableCell>
                                                {item.useYn}
                                            </TableCell>
                                            <TableCell>
                                                {dayjs(item.regDate).format("YYYY-MM-DD HH:mm:ss")}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )
                        }
                        {
                            (!isLoading && isSuccess && banner.list.length == 0) &&
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
                count={isSuccess ? banner.total : 0}
                rowsPerPage={searchParams.get("pageSize") ?? 10}
                page={searchParams.has("pageNum") ? searchParams.get("pageNum") - 1 : 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default BannerList;
