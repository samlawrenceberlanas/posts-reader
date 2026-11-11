import { isAxiosError } from "axios";
import { Link, useParams } from "react-router";

import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePost } from "@/features/posts/posts.hooks";
import { gutter } from "@/lib/layout";

const toParagraphs = (body: string) =>
  body
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const PostDetailsScreen = () => {
  const { postId } = useParams();
  const id = Number(postId);

  const { isPending, isError, error, data, refetch } = usePost(id);

  if (isPending)
    return (
      <div className="mt-12">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="mt-4 h-12 w-3/4" />
        <Skeleton className="mt-8 h-4 w-40" />
        <div className="mt-10 flex max-w-xl flex-col gap-3">
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );

  if (isError) {
    const missing = isAxiosError(error) && error.response?.status === 404;

    return (
      <div className={`mt-16 ${gutter}`}>
        <p className="text-sm tabular-nums text-muted-foreground sm:mt-2 sm:text-right">
          {missing ? "404" : null}
        </p>
        <div className="min-w-0 max-w-sm">
          <h1 className="font-reading text-[1.75rem] leading-[1.15] tracking-[-0.01em]">
            {missing ? "No post at this address" : "The post didn't load"}
          </h1>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
            {missing
              ? "This post either never existed or has been deleted."
              : error.message}
          </p>
          <div className="mt-6">
            {missing ? (
              <Link to="/" className={buttonVariants({ variant: "outline" })}>
                Browse all posts
              </Link>
            ) : (
              <Button variant="outline" onClick={() => refetch()}>
                Try again
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const paragraphs = toParagraphs(data.body ?? "");
  const railEdge = "sm:ml-20";

  return (
    <article className="mt-12">
      <p className="text-sm tabular-nums text-muted-foreground">#{data.id}</p>

      <h1 className="mt-3 font-reading text-[2.125rem] leading-[1.04] tracking-[-0.025em] text-balance sm:text-[3rem]">
        {data.title}
      </h1>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
        {typeof data.userId === "number" && <span>Author {data.userId}</span>}
      </div>

      {paragraphs.length > 0 && (
        <div
          className={`mt-9 max-w-[34rem] font-reading text-[1.0625rem] leading-[1.75] text-foreground/90 ${railEdge}`}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-6 first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </article>
  );
};

export default PostDetailsScreen;