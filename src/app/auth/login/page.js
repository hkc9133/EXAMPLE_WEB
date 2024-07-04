import {getProviders, signIn} from "next-auth/react"
import {getServerSession} from "next-auth/next"
import {authOptions} from "@/lib/nextauth";
import {useForm} from "react-hook-form";
import LoginForm from "@/components/front/auth/LoginForm";
import {redirect} from "next/navigation";

export default async function SignIn() {
    const session = await getServerSession(authOptions)
    if (session) {
        redirect("/")
        // return { redirect: { destination: '/' } }
    }
    return (
        <>
            <LoginForm/>
        </>
    )
}

// export async function getServerSideProps(context) {
//     const session = await getServerSession(context.req, context.res, authOptions)
//
//     // If the user is already logged in, redirect.
//     // Note: Make sure not to redirect to the same page
//     // To avoid an infinite loop!
//     if (session) {
//         return {redirect: {destination: "/"}}
//     }
//
//     const providers = await getProviders()
//
//     return {
//         props: {providers: providers ?? []},
//     }
// }
