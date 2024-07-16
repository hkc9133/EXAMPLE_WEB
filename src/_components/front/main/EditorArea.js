'use client'
import React, {useEffect, useState} from 'react';
const Editor = dynamic(
    () => {
        return import("@/components/common/Editor");
    },
    { ssr: false,loading: () => <Loader/> }
);
import dynamic from "next/dynamic";
import Loader from "@/components/common/loader/Loader";

const EditorArea = () => {
    const [editorContent,setEditorContent] = useState(`<p>123</p>`);

    useEffect(() => {
        console.log(editorContent)
    }, [editorContent]);
    return (
        <div>
        <Editor onChange={setEditorContent} data={editorContent}/>
        </div>
    );
};

export default EditorArea;
