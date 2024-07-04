'use client'

import React from 'react';
import {useForm} from "react-hook-form";
import {signIn} from "next-auth/react";
import {ErrorMessage} from "@hookform/error-message";
import Link from "next/link";
import {useRouter} from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
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

    const handleLogin = async data => {
        const res = await signIn("credentials", {
            redirect: false,
            userId: data.userId,
            userPassword: data.userPassword,
        });

        if (res?.ok) {
            router.push(`/`);
        } else {
        }
    };

    const handleKakao = async () => {
        const result = await signIn("kakao", {
            redirect: true,
            callbackUrl: "/",
        });
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
            <button onClick={handleKakao}>카카오 로그인</button>
        </form>
    );
};

export default LoginForm;
