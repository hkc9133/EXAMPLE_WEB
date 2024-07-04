import CredentialsProvider from "next-auth/providers/credentials";
import {signOut} from "next-auth/react";
import authService from "@/service/auth";


import KakaoProvider from "next-auth/providers/kakao";
async function refreshAccessToken(token) {
    try {

        const result = await authService.refresh(token.refresh);

        console.log("토큰 재발급 응답");
        console.log(result);

        if (result.status != 200) {
            await signOut({ callbackUrl: "/auth/login?errCode=401" });
            throw result;
        }

        return {
            ...token,
            access: result.data.data.access,
            refresh: result.data.data.refresh ? result.data.data.refresh : token.refresh,
            accessTokenExpires: result.data.data.accessTokenExpires,
        };
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const authOptions = {
    pages: {
        signIn: '/auth/aaa',
        error: '/',
    },
    cookie: {
        secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
        // secure: false,
    },
    session: {
        strategy: "jwt",
        // jwt: true,
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID || "",
            clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                userId: {
                    label: "userId",
                    type: "string",
                    placeholder: "example@example.com",
                },
                userPassword: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                try {
                    const result = await authService.login(credentials);

                    return result.data;
                } catch (err) {
                    console.log(err);
                    throw new Error(500);
                }
            },
        }),
    ],
    events: {
        async signOut() {

        },
    },
    callbacks: {
        async jwt({account, token, user, trigger, session}) {
            if (user) {
                return {
                    userId: user.userId,
                    userName: user.userName,
                    role: user.role,
                    access: user.access,
                    refresh: user.refresh,
                    accessTokenExpires: user.accessTokenExpires,
                };
            }
            if (
                trigger === "update" &&
                session?.token?.access &&
                session?.token?.refresh &&
                session?.token?.accessTokenExpires
            ) {
                return {
                    userId: token.userId,
                    userName: token.userName,
                    role: token.role,
                    access: session.access,
                    refresh: session.refresh,
                    accessTokenExpires: session.accessTokenExpires,
                };
            }
            const expirationTime = new Date(token.accessTokenExpires).getTime();

            // 10분
            const tenMinutesInMillis = 10 * 60 * 1000;

            if (Date.now() < expirationTime - tenMinutesInMillis) {
                return token;
            }

            return refreshAccessToken(token);
        },
        async session({session, token}) {
            console.log(session)
            if (token) {
                session.userId = token.userId;
                session.userName = token.userName;
                session.role = token.role;
                session.access = token.access;
            }

            return session;
        },
    },
};
