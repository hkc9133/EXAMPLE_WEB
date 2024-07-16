import React from "react";
import {redirect} from "next/navigation";
import SocialJoinForm from "@/components/front/auth/SocialJoinForm";

const Join = ({searchParams:{provider}}) => {
    console.log(provider)
    if(!provider){
        redirect("/500")
    }

    return(
        <>
            <section >
                <SocialJoinForm provider={provider}/>
            </section>
        </>
    );
};

export default Join;
