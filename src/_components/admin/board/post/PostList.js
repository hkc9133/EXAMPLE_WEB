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
import Image from "next/image";
import {Checkbox} from "@mui/material";

const PostList = ({post,noticeCnt=0,isLoading,isSuccess,thumbYn,selected,setSelected,columns}) => {
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
            const newSelected = post.list.map((post) => post.postId);
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
                                        indeterminate={selected.length > 0 && selected.length < post.list.length}
                                        checked={post.list.length > 0 && selected.length === post.list.length}
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
                                post.list.map((item, i) => {
                                    const isItemSelected = isSelected(item.postId);
                                    const labelId = `enhanced-table-checkbox-${i}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, item.postId)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={`post_${item.postId}`}
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
                                                {item.noticeYn == 'Y' ? "공지" : (post.startRow - noticeCnt) + i}
                                            </TableCell>
                                            {(thumbYn == 'Y') && (
                                                <TableCell>
                                                    {item.thumbFileList.map((item) => {
                                                        return <Image key={`${item.fileId}_thumb`}
                                                                      width={100}
                                                                      height={100}
                                                                      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/resource${item.filePath}/${item.fileName}`}/>
                                                    })}
                                                </TableCell>
                                            )}
                                            <TableCell>
                                                <Link
                                                onClick={(e) =>{e.stopPropagation()}}
                                                    href={`${pathname}/write?postId=${item.postId}`}>{item.title}</Link>
                                            </TableCell>
                                            <TableCell>
                                                {item.categoryName}
                                            </TableCell>
                                            <TableCell>
                                                {item.viewCnt}
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
                            (!isLoading && isSuccess && post.list.length == 0) &&
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
                count={isSuccess ? post.total : 0}
                rowsPerPage={searchParams.get("pageSize") ?? 10}
                page={searchParams.has("pageNum") ? searchParams.get("pageNum") - 1 : 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default PostList;
