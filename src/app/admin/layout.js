

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MuiThemeProvider from "../../_provider/mui/MuiThemeProvider";
import Layout from "@/components/admin/laylout/Layout";

export default function RootLayout({children}) {
    return <MuiThemeProvider><Layout>{children}</Layout></MuiThemeProvider>
}
