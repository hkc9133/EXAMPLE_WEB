'use client'
import React, {useState} from 'react';
import PageContainer from "@/components/admin/common/PageContainer";
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import {Grid, TextField} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UserSetting from "@/components/admin/user/UserSetting";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const Page = () => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <>
        <PageContainer>
            <Grid item xs={12}>
                <Card sx={{
                    paddingTop: 2,
                    paddingBottom: 2,
                }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Item One" {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <UserSetting/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <TextField
                            id="standard-helperText"
                            label="Helper text"
                            defaultValue="Default Value"
                            helperText="Some important text"
                            variant="standard"
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>

            </Card>
        </Grid>
        </PageContainer>
</>
)
    ;
};

export default Page;
