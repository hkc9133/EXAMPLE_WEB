import React from 'react';
import PageHeader from "@/components/admin/common/PageHeader";
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import PageContainer from "@/components/admin/common/PageContainer";
import CategoryManage from "@/components/admin/category/CategoryManage";

const Page = () => {
    return (
        <PageContainer>
            <PageHeader title={"카테고리 관리"} desc={""}/>
            <Grid item xs={12}>
                <Card sx={{p: 5}}>
                    <CategoryManage/>
                </Card>
            </Grid>
        </PageContainer>
    );
};

export default Page;
