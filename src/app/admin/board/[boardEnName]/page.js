import React from 'react';
import PageHeader from "@/components/admin/common/PageHeader";
import {Card, Grid} from "@mui/material";
import PostSearch from "@/components/admin/board/post/PostSearch";
import PostListViewButtonGroup from "@/components/admin/board/post/PostListViewButtonGroup";
import PostListView from "@/components/admin/board/post/PostListView";
import PageContainer from "@/components/admin/common/PageContainer";

const Page = ({params:{boardEnName}}) => {
    console.log(boardEnName)
    return (
        <PageContainer>
            <PageHeader title={"게시글 목록"} desc={""}/>
            <Grid item xs={12}>
                <Card sx={{
                    p:5
                }}>
                    <PostListView boardEnName={boardEnName}/>
                </Card>
            </Grid>
        </PageContainer>
    );
};

export default Page;
