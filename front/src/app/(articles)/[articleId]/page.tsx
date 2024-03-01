import Image from "next/image";
import {revalidatePath} from "next/cache";

import CommentForm from "@/app/(articles)/[articleId]/components/CommentForm/CommentForm";
import {getArticleById} from "@/api/Article/getArticleById";
import {createComment} from "@/api/Article/createComment";
import styles from "./styles.module.css";

import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from "next/navigation";
import {AuthManager} from "@/utils";

type Props = { params: { articleId: string } }

export async function generateMetadata({params}: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const article = await getArticleById(params.articleId);
    if (article) {
        const previousImages = (await parent).openGraph?.images || []

        return {
            title: article.title,
            description: article.text.split(".")[0],
            openGraph: {images: [article.image.url, ...previousImages]},
        }
    }
    return {
        title: "Article not found",
        description: ""
    }
}

async function Page({params}: { params: { articleId: string } }) {
    const article = await getArticleById(params.articleId);

    if (!article) notFound();

    const handleCreateComment = async (formData: FormData) => {
        "use server"

        const comment = {
            text: formData.get('text') as string,
            articleId: Number(params.articleId)
        }
        return createComment(comment)
            .then(res => {
                revalidatePath(`/articles/${params.articleId}`);
            });
    }

    return (
        <>
            <article>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <h5 className={styles.articleSubTitle}>{article.subTitle}</h5>
                <Image src={article.image.url}
                       width={article.image.width}
                       height={article.image.height}
                       alt={article.image.caption}
                       className={styles.articleImage}/>
                <p className={styles.articleText}>{article.text}</p>
            </article>
            <footer>
                <h6 className={styles.commentsTitle}>Responses ({article.comments.length})</h6>
                <CommentForm notAllowed={AuthManager.authorized}
                             articleId={params.articleId}
                             onCreateComment={handleCreateComment}/>
                <ul className={styles.commentsList}>
                    {article.comments.map((comment) => {
                        return (
                            <li key={comment.id} className={styles.commentListItem}>
                                <header>{comment.author.username}</header>
                                <p className={styles.commentText}>{comment.text}</p>
                            </li>
                        )
                    })}
                </ul>
            </footer>
        </>
    );
}

export default Page;