import React from 'react';
import PageContainer from "@/components/admin/common/PageContainer";
import {Grid, TextField} from "@mui/material";
import Card from "@mui/material/Card";
import UserSetting from "@/components/admin/user/UserSetting";
import PageHeader from "@/components/admin/common/PageHeader";
import PopupEditorView from "@/components/admin/popup/PopupEditorView";

const Page = ({searchParams: {popupId}}) => {
    return (
        <>
            <PageContainer>
                <PageHeader title={"팝업 관리"} desc={""}/>
                <Grid item xs={12}>
                    <Card sx={{p: 5}}>
                        <PopupEditorView popupId={popupId}/>
                    </Card>
                </Grid>
            </PageContainer>
        </>
    );
};

export default Page;
