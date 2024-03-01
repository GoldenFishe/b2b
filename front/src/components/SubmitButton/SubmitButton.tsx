'use client'

import {ReactNode} from "react";
import {useFormStatus} from "react-dom";

interface Props {
    className?: string;
    children: ReactNode;
}

export function SubmitButton(props: Props) {
    const {pending} = useFormStatus();

    return (
        <button type="submit" aria-disabled={pending}  disabled={pending} className={props.className}>{props.children}</button>
    )
}