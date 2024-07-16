import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MuiThemeProvider from "../../_provider/mui/MuiThemeProvider";
import Layout from "@/components/admin/laylout/Layout";
import AuthProvider from "@/provider/auth/AuthProvider";
import Hydrations from "../../_store/Hydrations";


export default function RootLayout({children}) {
    return (
        <MuiThemeProvider>
            <Hydrations/>
            <AuthProvider requireAdmin={true}>
                <Layout>
                    {children}
                </Layout>
            </AuthProvider>
        </MuiThemeProvider>
    )
}
