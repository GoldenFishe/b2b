"use client"

import React from 'react';
import {useFormState} from 'react-dom';
import {useSearchParams} from "next/navigation";

import {SubmitButton} from "@/components/SubmitButton/SubmitButton";
import styles from "./styles.module.css";

const initialState = {
    message: '',
}

interface Props {
    onSubmit: (prevState: unknown, formData: FormData) => Promise<{ message: string } | undefined>
}

function SignInForm({onSubmit}: Props) {
    const [state, formAction] = useFormState(onSubmit, initialState)
    const searchParams = useSearchParams();

    return (
        <form action={formAction} className={styles.form}>
            {<p aria-live="polite" className="sr-only">{state?.message}</p>}
            <label className={styles.inputWrapper}>
                Your email
                <input type="email" required name="login" className={styles.input}/>
            </label>
            <label className={styles.inputWrapper}>
                Your password
                <input type="password" required name="password" className={styles.input}/>
            </label>
            <input type="hidden" name="redirectTo" value={searchParams.get("redirectTo") || ""}/>
            <SubmitButton className={styles.submitButton}>Sign In</SubmitButton>
        </form>
    );
}

export default SignInForm;