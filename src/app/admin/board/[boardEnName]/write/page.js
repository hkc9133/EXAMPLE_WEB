import React from 'react';
import PageContainer from "@/components/admin/common/PageContainer";
import PageHeader from "@/components/admin/common/PageHeader";
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import PostEditorView from "@/components/admin/board/post/PostEditorView";

const Page = ({searchParams:{postId},params:{boardEnName}}) => {
    console.log(boardEnName)

    return (
        <>
            <PageContainer>
                <PageHeader title={"게시판 글 관리"} desc={""}/>
                <Grid item xs={12}>
                    <Card sx={{p: 5}}>
                        <PostEditorView postId={postId} boardEnName={boardEnName}/>
                    </Card>
                </Grid>
            </PageContainer>
        </>
    );
};

export default Page;
