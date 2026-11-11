
import { Link } from "react-router";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Post } from "../posts.types";

const PostRow = ({ post }: { post: Post }) => {
  return (
    <Card size="sm" className="relative">
      <CardHeader>
        <h2 className="min-w-0 font-reading text-[1.375rem] leading-[1.25] font-normal tracking-[-0.01em] text-balance">
          <Link
            to={`/posts/${post.id}`}
            className="underline-offset-[0.2em] before:absolute before:inset-0 before:content-[''] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            {post.title}
          </Link>
        </h2>

        <CardAction className="text-sm tabular-nums text-muted-foreground">
          #{post.id}
        </CardAction>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-2 text-[0.9375rem] leading-[1.6] text-muted-foreground">
          {post.body}
        </p>
      </CardContent>
    </Card>
  );
};

export default PostRow;

export const PostRowSkeleton = () => {
  return (
    <Card size="sm">
      <CardHeader>
        <Skeleton className="h-6 rounded-md" />
        <Skeleton className="h-6 w-2/3 rounded-md" />
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-4 rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
      </CardContent>
    </Card>
  );
};
