"use client";

import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import cs from "./Loader.module.scss";
import { loaderAtom } from "@/atom/common/loader";
import { blackBgAtom } from "@/atom/common/blackBg";

const FullLoader = () => {
    const loader = useRecoilValue(loaderAtom);
    const [blackBg, setBlackBg] = useRecoilState(blackBgAtom);

    useEffect(() => {
        if (loader) {
            setBlackBg(true);
        } else {
            setBlackBg(false);
        }
    }, [loader]);

    if (!loader) return null;

    return (
        <div className={cs.full_loader}>
            <div className={cs.spinner} />
        </div>
    );
};

export default FullLoader;
