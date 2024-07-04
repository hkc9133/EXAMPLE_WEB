export const seo = {
    title: {
        default: process.env.META_TITLE,
        template: `%s | ${process.env.META_TITLE}`,
    },
    description: process.env.META_DESC,
    generator: "Next.js",
    applicationName: "",
    referrer: "origin-when-cross-origin",
    // keywords: process.env.META_KEYWORD.split(','),
    creator: "",
    publisher: "",
    alternates: {},
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: process.env.META_TITLE,
        description: process.env.META_DESC,
        // url: process.env.NEXT_PUBLIC_URL,
        siteName: process.env.META_TITLE,
        images: [
            {
                url: process.env.NEXT_PUBLIC_OG_URL,
                width: 800,
                height: 600,
                alt: "",
            },
            {
                url: process.env.NEXT_PUBLIC_OG_URL,
                width: 1800,
                height: 1600,
                alt: "",
            },
        ],
        locale: "ko_KR",
        type: "website",
    },
};
