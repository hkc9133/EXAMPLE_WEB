import "./globals.css";
import "public/ck-editor.css";
import Providers from "../_provider/providers";
import Alert from "@/components/front/common/modal/Alert";
import Confirm from "@/components/front/common/modal/Confirm";
import 'dayjs/locale/ko'; // load on demand
import dayjs from 'dayjs';
import siteSettingService from "@/service/user/site_setting";
import client from "@/lib/client";

dayjs.locale('ko'); // use Spanish locale globally

export async function generateMetadata() {
    const {data} = await siteSettingService.getSiteSetting();
    const setting = data;

    const title = setting.siteTitle ?? "";
    const desc = setting.siteDesc ?? "";
    const url = process.env.NEXT_PUBLIC_URL ?? "";
    const icon = setting.faviconImage ?? process.env.NEXT_PUBLIC_FAVICON_URL;
    const ogImage = setting.ogImage ?? process.env.NEXT_PUBLIC_OG_URL;
    const keywords = setting.keyword ?? ""
    return {
        title: {
            template: `%s | ${title}`,
            default: title,
        },
        description: desc,
        keywords:keywords,
        icons: {
            icon: icon,
        },
        openGraph: {
            siteName: title,
            title: title,
            description: desc,
            icon: icon,
            url: url,
            images: [
                {
                    url: ogImage,
                    alt: title,
                },
            ],
        },
    };
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <Providers>
            {children}
            <Alert/>
            <Confirm/>
        </Providers>
        </body>
        </html>
    );
}
