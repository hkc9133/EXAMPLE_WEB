import React from 'react';
import PageHeader from "@/components/admin/common/PageHeader";
import {Card, Grid} from "@mui/material";
import PageContainer from "@/components/admin/common/PageContainer";
import BannerListView from "@/components/admin/banner/BannerListView";

const Page = () => {
    return (
        <PageContainer>
            <PageHeader title={"배너 목록"} desc={""}/>
            <Grid item xs={12}>
                <Card sx={{
                    p:5
                }}>
                    <BannerListView/>
                </Card>
            </Grid>
        </PageContainer>
    );
};

export default Page;
