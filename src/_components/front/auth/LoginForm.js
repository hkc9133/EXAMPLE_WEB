'use client'

import React from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import Link from "next/link";
import {useRouter} from "next/navigation";
import authService from "@/service/auth";
import {useAuthStore} from "../../../_store/useAuthStore";
import {useLogin} from "@/hook/auth/useAuthMutations";
import {useModalStore} from "../../../_store/useModalStore";

const LoginForm = () => {
    const router = useRouter();
    const authStore = useAuthStore();
    const {
        register,
        getValues,
        setError,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            userId: "admin",
            userPassword: "1q2w3e4r!",
        },
    });
    const loginMutation = useLogin();
    const {onConfirm, onAlert} = useModalStore()

    const handleLogin = data => {
        loginMutation.mutate(data,{
            onSuccess: () => {
                router.push("/")
            },
            onError: (error) => {
                onAlert({message:'입력값을 확인해주세요'})
            }
        })

        // authService.login(data).then((data) =>{
        //     console.log(data)
        //     authStore.saveUser(data)
        //     localStorage.setItem("access",data.access)
        //     router.push("/")
        // })
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)} autoComplete="">
            <div className="form_cont">
                <input
                    type="text"
                    placeholder="ID"
                    autoComplete="username"
                    {...register(`userId`, {
                        required: "아이디를 입력해주세요",
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="userId"
                    render={({message}) => {
                        message
                    }}
                />
            </div>
            <div className="form_cont">
                <input
                    type="password"
                    placeholder="PASSWORD"
                    autoComplete="current-password"
                    {...register(`userPassword`, {
                        required: "패스워드를 입력해주세요",
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({message}) => {
                        message
                    }}
                />
            </div>
            <div className="form_etc">
                <ul>
                    <li>
                        <input type="checkbox" id="remember_id"/>
                        <label htmlFor="remember_id">아이디 저장</label>
                    </li>
                    <li>
                        <Link href="/auth/join">회원가입</Link>
                    </li>
                </ul>
            </div>
            <button>LOGIN</button>
            <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/authorization/kakao`}>카카오 로그인</Link>
        </form>
    );
};

export default LoginForm;
