import React from 'react';
import PageHeader from "@/components/admin/common/PageHeader";
import {Button, Card, CardHeader, Grid} from "@mui/material";
import PageContainer from "@/components/admin/common/PageContainer";
import PopupListView from "@/components/admin/popup/PopupListView";
import PopupSearch from "@/components/admin/popup/PopupSearch";
import PopupListViewButtonGroup from "@/components/admin/popup/PopupListViewButtonGroup";

const Page = ({searchParams,params}) => {

    return (
        <PageContainer>
            <PageHeader title={"팝업 목록"} desc={""}/>
            <Grid item xs={12}>
                <Card sx={{
                    p:5
                }}>
                    <PopupSearch/>
                    <PopupListViewButtonGroup/>
                    <PopupListView/>
                </Card>
            </Grid>
        </PageContainer>
    );
};

export default Page;
