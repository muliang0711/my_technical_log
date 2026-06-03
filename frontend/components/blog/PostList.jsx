import PostCard from "./PostCard";

export default function PostList({ posts, columns = 2 }) {
  return (
    <div className={`grid grid--${columns}`}>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} wide={columns === 2} />
      ))}
    </div>
  );
}
