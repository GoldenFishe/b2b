import {redirect, RedirectType} from "next/navigation";
import type {Metadata} from "next";

import {signIn} from "@/api/User/signIn";
import {AuthManager} from "@/utils";
import SignInForm from "./components/SignInForm/SignInForm";
import styles from "./styles.module.css";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sing In to B2B test app"
};

async function Page() {
    const handleSignIn = async (prevState: unknown, formData: FormData) => {
        "use server"
        const body = {
            login: formData.get("login") as string,
            password: formData.get("password") as string
        }
        const redirectTo = formData.get('redirectTo') as string || '/';
        return signIn(body)
            .then(user => {
                if (user) {
                    AuthManager.accessToken = user.jwt;
                    AuthManager.userId = user.id;
                } else {
                    return {message: "Email or password is incorrect"};
                }
            })
            .finally(() => {
                if (AuthManager.authorized) {
                    redirect(redirectTo, RedirectType.replace);
                }
            })
    }

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Sign in with email</h2>
            <SignInForm onSubmit={handleSignIn}/>
        </section>
    );
}

export default Page;