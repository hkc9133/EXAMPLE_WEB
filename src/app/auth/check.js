import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import axios from "axios";

const Check = ({result,data}) => {
    const router = useRouter();

    useEffect(() => {
        loaderActions.show()
        if(result){
            setMyInfo(data)
            router.push("/")
        }else{
            setMyInfo(null)
            router.push("/auth/login")
        }
        return () =>{
            loaderActions.clear()
        }
    }, []);
    return (
        <div style={{height:'100vh'}}>

        </div>
    );
};

export default Check;
export const getServerSideProps = async (context) => {
    const cookie = context.req && context.req.headers.cookie ? context.req.headers.cookie : '';

    const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/my/info`,{ headers:{Cookie:cookie} }).then((res) => {
        context = setToken(context,res);
        return {
            props: {
                result: true,
                data:res.data.data
            },
        };
    }).catch((e) => {
        return {
            props: {
                result: false,
            },
        };
    })

    return result
}
