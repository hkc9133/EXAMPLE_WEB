import React from 'react';
import PageContainer from "@/components/admin/common/PageContainer";
import PageHeader from "@/components/admin/common/PageHeader";
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import BoardEditorView from "@/components/admin/board/BoardEditorView";

const Page = ({searchParams: {boardEnName}}) => {
    return (
        <>
            <PageContainer>
                <PageHeader title={"게시판 관리"} desc={""}/>
                <Grid item xs={12}>
                    <Card sx={{p: 5}}>
                        <BoardEditorView boardEnName={boardEnName}/>
                    </Card>
                </Grid>
            </PageContainer>
        </>
    );
};

export default Page;
