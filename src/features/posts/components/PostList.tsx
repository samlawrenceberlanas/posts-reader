
import { Button } from "@/components/ui/button";
import { usePosts } from "../posts.hooks";
import PostRow, { PostRowSkeleton } from "./Post";

const PostList = () => {
  const { isPending, isError, error, data, refetch } = usePosts();

  if (isPending)
    return (
      <div className="mt-10">
        <p role="status" className="sr-only">
          Loading posts
        </p>

        <div aria-hidden className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((index) => (
            <PostRowSkeleton key={index} />
          ))}
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="mt-16 max-w-sm">
        <h1 className="font-reading text-[1.75rem] leading-[1.15] tracking-[-0.01em]">
          The posts didn't load
        </h1>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          {error.message}
        </p>

        <Button
          variant="outline"
          className="mt-6"
          onClick={() => refetch()}
        >
          Try again
        </Button>
      </div>
    );

  if (data.length === 0)
    return (
      <p className="mt-16 text-[0.9375rem] text-muted-foreground">
        Nothing published yet.
      </p>
    );

  return (
    <div className="mt-10 flex flex-col gap-3">
      {data.map((post) => (
        <PostRow post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
