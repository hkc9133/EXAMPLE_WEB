'use client'
import React from 'react';
import {useForm} from "react-hook-form";
import {emailVal} from "@/constants/validation";
import authService from "@/service/auth";
import {useModalStore} from "../../../_store/useModalStore";
import {useRouter} from "next/navigation";

const SocialJoinForm = ({provider}) => {
    const {
        register,
        getValues,
        setError,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            role: 'ROLE_USER',
            provider: provider
        }
    });

    const router = useRouter();

    const {onConfirm, onAlert} = useModalStore()

    const onSubmit = (data) => {
        authService.socialJoin(data).then((res) => {
            onAlert({message: "가입 완료",callback:() => router.push("/")})
        })
    }

    const confirmSubmit = (data) => {
        onConfirm({
            message: "가입하시겠습니까?",
            btnText: '가입22',
            callback: () => onSubmit(data)
        })
        // onConfirm("가입하시겠습니까?",() =>onSubmit(data))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(confirmSubmit)} autoComplete={"off"}>
                <input type="text" placeholder="이름을 입력하세요"
                       {...register("provider", {
                           required: true,
                       })} hidden={true}/>
                <div>
                    <h3>이름 <strong>*</strong></h3>
                    <input type="text" placeholder="이름을 입력하세요"
                           {...register("userName", {
                               required: "이름을 입력하세요",
                           })}/>
                </div>
                <div>
                    <h3>이메일 <strong>*</strong></h3>
                    <input type="text" placeholder="이메일을 입력하세요."
                           {...register("userEmail", {
                               required: "이메일을 입력하세요.",
                               pattern: {
                                   value: emailVal,
                                   message: "E-MAIL을 확인해주세요"
                               }
                           })}/>
                </div>
                <button type="submit">가입하기</button>
            </form>
        </div>
    );
};

export default SocialJoinForm;
