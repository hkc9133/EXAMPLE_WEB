import React from 'react';
import PageHeader from "@/components/admin/common/PageHeader";
import {Card, Grid} from "@mui/material";
import PageContainer from "@/components/admin/common/PageContainer";
import SiteSettingEditorView from "@/components/admin/site_setting/SiteSettingEditorView";

const Page = () => {
    return (
        <PageContainer>
            <PageHeader title={"사이트 설정"} desc={""}/>
            <Grid item xs={12}>
                <Card sx={{
                    p:5
                }}>
                    <SiteSettingEditorView/>
                </Card>
            </Grid>
        </PageContainer>
    );
};

export default Page;
