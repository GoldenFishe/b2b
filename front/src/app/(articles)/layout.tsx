import {ReactNode} from 'react';
import Link from "next/link";
import type {Metadata} from "next";

import {AuthManager} from "@/utils";
import styles from "./styles.module.css";

export const metadata: Metadata = {
    title: "Articles",
    description: "Articles about b2b"
};

function Layout({children}: { children: ReactNode }) {
    return (
        <>
            <nav className={styles.nav}>
                <Link href="/" className={styles.titleLink}>
                    <h1>B2B</h1>
                </Link>
                <ul className={styles.linksList}>
                    <li>
                        <Link href="/">Articles</Link>
                    </li>
                    <li>
                        {AuthManager.authorized ?
                            null :
                            <Link href="/sign-in">Sign In</Link>
                        }
                    </li>
                </ul>
            </nav>
            <main className={styles.container}>
                {children}
            </main>
        </>
    );
}

export default Layout;