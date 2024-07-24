import React from 'react';
import PageContainer from "@/components/admin/common/PageContainer";
import PageHeader from "@/components/admin/common/PageHeader";
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import BannerEditorView from "@/components/admin/banner/BannerEditorView";

const Page = ({searchParams:{bannerId}}) => {

    return (
        <>
            <PageContainer>
                <PageHeader title={"배너 관리"} desc={""}/>
                <Grid item xs={12}>
                    <Card sx={{p: 5}}>
                        <BannerEditorView bannerId={bannerId}/>
                    </Card>
                </Grid>
            </PageContainer>
        </>
    );
};

export default Page;
