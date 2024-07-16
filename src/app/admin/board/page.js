import React from 'react';
import PageHeader from "@/components/admin/common/PageHeader";
import {Card, Grid} from "@mui/material";
import PageContainer from "@/components/admin/common/PageContainer";
import BoardSearch from "@/components/admin/board/BoardSearch";
import BoardListViewButtonGroup from "@/components/admin/board/BoardListViewButtonGroup";
import BoardListView from "@/components/admin/board/BoardListView";

const Page = () => {
    return (
        <PageContainer>
            <PageHeader title={"게시판 목록"} desc={""}/>
            <Grid item xs={12}>
                <Card sx={{
                    p:5
                }}>
                    <BoardSearch/>
                    <BoardListViewButtonGroup/>
                    <BoardListView/>
                </Card>
            </Grid>
        </PageContainer>
    );
};

export default Page;
