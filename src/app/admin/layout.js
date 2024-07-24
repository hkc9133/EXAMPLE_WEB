import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MuiThemeProvider from "../../_provider/mui/MuiThemeProvider";
import Layout from "@/components/admin/laylout/Layout";
import AuthProvider from "@/provider/auth/AuthProvider";
import Hydrations from "@/store/Hydrations";

export const metadata = {
    title: {
        template: `%s | ${process.env.META_TITLE}`,
        default: `관리자`,
    },
};

export default function RootLayout({children}) {
    return (
        <MuiThemeProvider>
            <AuthProvider requireAdmin={true}>
                <Layout>
                    {children}
                </Layout>
            </AuthProvider>
        </MuiThemeProvider>
    )
}
