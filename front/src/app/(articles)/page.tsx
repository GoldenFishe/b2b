import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";

import {getArticles} from "@/api/Article/getArticles";
import styles from "./styles.module.css";

async function Page() {
    const articles = await getArticles();

    if (!articles) notFound();
    
    return (
        <ul className={styles.articlesList}>
            {articles.data!.map((article) => {
                return (
                    <li key={article.id} className={styles.articlesListItem}>
                        <article className={styles.article}>
                            <h6 className={styles.articleTitle}>{article.title}</h6>
                            <Image src={article.image.url}
                                   width={200}
                                   height={134}
                                   className={styles.articleImage}
                                   alt={article.image.caption}/>
                            <p className={styles.articleText}>{article.subTitle}</p>
                            <footer>
                                <Link href={article.id.toString()}>Read more</Link>
                            </footer>
                        </article>
                    </li>
                )
            })}
        </ul>
    )
}

export default Page;