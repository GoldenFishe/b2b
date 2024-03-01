"use client"

import Link from "next/link";
import {useRef} from "react";

import {SubmitButton} from "@/components/SubmitButton/SubmitButton";
import styles from "./styles.module.css";

interface Props {
    notAllowed: boolean;
    articleId: string;
    onCreateComment: (comment: FormData) => Promise<void>;
}

function CommentForm({notAllowed, articleId, onCreateComment}: Props) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleCreateComment = (formData: FormData) => {
        onCreateComment(formData).then(() => {
            formRef.current?.reset();
        });
    }

    return (
        <form action={handleCreateComment} className={styles.commentForm} ref={formRef}>
            <label className={styles.commentLabel}>
                Your response
                <textarea name="text"
                          className={styles.textarea}
                          placeholder="What are your thoughts?"
                          required
                          rows={4}
                          minLength={4}
                          maxLength={255}/>
            </label>
            <SubmitButton className={styles.submitButton}>Respond</SubmitButton>
            {!notAllowed &&
                <div className={styles.authLayout}>
                    <Link href={{pathname: "/sign-in", query: {redirectTo: articleId}}}>You have to Sign In</Link>
                </div>}
        </form>
    );
}

export default CommentForm;