"use client";

import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import PostCard from "../components/PostCard";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
    loves: number;
  };
  views: number;
};

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Fetch posts
  const fetchData = async (page: number, limit: number) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://dummyjson.com/posts?limit=${limit}&skip=${(page - 1) * limit}`
      );
      const data = await res.json();

      if (data.posts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setFilteredPosts((prevPosts) => [...prevPosts, ...data.posts]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch 20 posts initially
    fetchData(page, 20);
  }, [page]);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredPosts(posts);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercasedQuery) ||
        post.body.toLowerCase().includes(lowercasedQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredPosts(filtered);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#f8d9e0] to-[#fffef2]">
        <div className="flex flex-col items-center space-y-6">
          <FaSpinner className="text-6xl text-[#a3386c] animate-spin" />
          <p className="text-2xl font-semibold text-[#6a4c6c]">
            Loading posts...
          </p>
          <p className="text-lg text-gray-500">
            Please wait while we fetch your posts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fffef2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Image
            src="/Images/blog-post-2.jpeg"
            alt="blog-post"
            width={48}
            height={48}
            className="object-cover rounded-lg"
          />
          <h1 className="text-4xl font-semibold text-[#a3386c]">Blog Posts</h1>
        </div>

        <div className="max-w-lg mx-auto mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={`${post.id}-${page}`}
                id={post.id}
                title={post.title}
                body={post.body}
                reactions={post.reactions}
              />
            ))
          ) : (
            <p className="text-gray-600 col-span-3">
              No blog posts found matching your query.
            </p>
          )}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <FaSpinner className="text-3xl text-[#a3386c] animate-spin" />
              <h3 className="text-lg font-semibold text-[#a3386c]">
                Loading more posts, please wait...
              </h3>
            </div>
          ) : (
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-[#a3386c] text-white rounded-lg hover:bg-[#6a4c6c] transition-colors"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
