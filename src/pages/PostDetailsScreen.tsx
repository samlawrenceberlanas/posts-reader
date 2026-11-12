import { isAxiosError } from "axios";
import { Link, useParams } from "react-router";
import Avatar from "@/components/avatar";
import FormattedDate from "@/components/formatted-date";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CommentList from "@/features/comments/components/CommentList";
import { usePost } from "@/features/posts/posts.hooks";
import { gutter } from "@/lib/layout";

const toParagraphs = (body: string) =>
  body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const railEdge = "sm:ml-20";

const PostDetailsScreen = () => {
  const { postId } = useParams();
  const { isPending, isError, error, data, refetch } = usePost(Number(postId));

  if (isPending)
    return (
      <div className="mt-12">
        <p role="status" className="sr-only">Loading post</p>
        <div aria-hidden>
          <Skeleton className="h-4 w-8 rounded-md" />
          <Skeleton className="mt-3 h-9 rounded-lg sm:h-12" />
          <Skeleton className="mt-2 h-9 w-3/4 rounded-lg sm:h-12" />
          <div className="mt-7 flex items-center gap-2.5 border-t border-border pt-4">
            <Skeleton className="size-8 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>
          <div className={`mt-9 flex max-w-[34rem] flex-col gap-3 ${railEdge}`}>
            <Skeleton className="h-4 rounded-md" />
            <Skeleton className="h-4 rounded-md" />
            <Skeleton className="h-4 w-11/12 rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
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

  return (
    <>
      <article className="mt-12">
        <p className="text-sm tabular-nums text-muted-foreground">#{data.id}</p>
        <h1 className="mt-3 font-reading text-[2.125rem] leading-[1.04] tracking-[-0.025em] text-balance sm:text-[3rem]">
          {data.title}
        </h1>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
          {typeof data.userId === "number" && (
            <span className="flex items-center gap-2.5">
              <Avatar>{data.userId}</Avatar>
              Author {data.userId}
            </span>
          )}
          <FormattedDate value={data.createdAt} />
        </div>
        {paragraphs.length > 0 && (
          <div className={`mt-9 max-w-[34rem] font-reading text-[1.0625rem] leading-[1.75] text-foreground/90 ${railEdge}`}>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="mt-6 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </article>
      <CommentList postId={data.id} />
    </>
  );
};

export default PostDetailsScreen;