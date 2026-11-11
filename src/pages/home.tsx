
import PostList from "@/features/posts/components/PostList";

const Home = () => {
  return (
    <section>
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        The collection
      </p>

      <h1 className="mt-3 font-reading text-4xl tracking-tight">
        All Posts
      </h1>

      <p className="mt-3 max-w-xl text-muted-foreground">
        Browse and read posts from our collection.
      </p>

      <PostList />
    </section>
  );
};

export default Home;
