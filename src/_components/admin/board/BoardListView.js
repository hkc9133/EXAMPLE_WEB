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
import {useBoardListQuery} from "@/hook/admin/useBoardQuery";

const columns = [
    {id: 'boardEnName', label: '게시판 이름', minWidth: 200},
    {id: 'boardDesc', label: '게시판 설명', minWidth: 230,},
    {id: 'type', label: '유형', minWidth: 170,},
];

const BoardListView = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [param, setParam] = useState(null);

    const {data, isError, isLoading, isSuccess} = useBoardListQuery(searchParams.toString())

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

    return (
        <>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
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
                                <TableCell colSpan={columns.length + 1} >
                                    <Loader/>
                                </TableCell>
                            </TableRow>
                        }
                        {
                            (!isLoading && isSuccess) && (
                                data?.data?.list?.map((item, i) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={`${item.boardEnName}_row`}>
                                        <TableCell>
                                            {data?.data?.startRow + i}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`${pathname}/write?boardEnName=${item.boardEnName}`}>{item.boardKrName}</Link>
                                        </TableCell>
                                        <TableCell>
                                            {item.boardDesc}
                                        </TableCell>
                                        <TableCell>
                                            {item.type}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                        {
                            (!isLoading && isSuccess && data?.data?.list.length == 0) &&
                            <TableRow><TableCell colSpan={columns.length + 1} align={"center"}>데이터가
                                없습니다</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                labelRowsPerPage={"페이지 당"}
                component="div"
                count={data?.data?.total}
                rowsPerPage={searchParams.get("pageSize") ?? 10}
                page={searchParams.has("pageNum") ? searchParams.get("pageNum") - 1 : 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default BoardListView;
