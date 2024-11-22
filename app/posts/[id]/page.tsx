import { notFound } from "next/navigation";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await fetch(`https://dummyjson.com/posts/${id}`)
    .then((res) => res.json())
    .catch(() => null);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.body,
    openGraph: {
      title: post.title,
      description: post.body,
      url: `https://yourwebsite.com/posts/${id}`,
      images: [
        {
          url: "https://example.com/path-to-your-image.jpg",
        },
      ],
    },
  };
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const post = await fetch(`https://dummyjson.com/posts/${id}`)
    .then((res) => res.json())
    .catch(() => null);

  if (!post) {
    notFound();
  }

  const relatedPostsResponse = await fetch("https://dummyjson.com/posts")
    .then((res) => res.json())
    .catch(() => ({ posts: [] }));

  const relatedPosts = Array.isArray(relatedPostsResponse.posts)
    ? relatedPostsResponse.posts
    : [];

  return (
    <div className="bg-[#f0d0d6] min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-[#a3386c]">{post.title}</h1>
        <p className="text-lg text-gray-700 mt-4">{post.body}</p>

        <div className="mt-6">
          <p className="text-gray-600 text-base">{post.body}</p>
        </div>

        <div className="mt-4">
          <span className="text-lg font-semibold text-[#a3386c] uppercase tracking-wider">
            Categories:{" "}
          </span>
          <span className="font-semibold text-[#a3386c]">
            {post.tags && post.tags.length > 0 ? (
              post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-block px-4 py-1 mr-2 mt-1 text-sm font-medium text-[#a3386c] bg-[#f0d0d6] rounded-full border border-[#a3386c] hover:bg-[#a3386c] hover:text-white transition duration-300"
                >
                  {tag}
                  {index < post.tags.length - 1}{" "}
                </span>
              ))
            ) : (
              <span className="italic text-gray-400">No tags available</span>
            )}
          </span>
        </div>

        {/* Social Sharing Buttons */}
        <div className="mt-6 flex items-center space-x-4">
          <span className="text-lg font-semibold text-[#a3386c]">
            Share this post:
          </span>

          {/* Twitter Button */}
          <a
            href={`https://twitter.com/share?url=https://yourwebsite.com/posts/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1DA1F2] hover:bg-[#0d8c9f] transition duration-300 shadow-lg"
          >
            <FaTwitter className="text-white w-7 h-7" />
          </a>

          {/* Facebook Button */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com/posts/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#3b5998] hover:bg-[#2d4373] transition duration-300 shadow-lg"
          >
            <FaFacebookF className="text-white w-7 h-7" />
          </a>

          {/* LinkedIn Button */}
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=https://yourwebsite.com/posts/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0077b5] hover:bg-[#005582] transition duration-300 shadow-lg"
          >
            <FaLinkedinIn className="text-white w-7 h-7" />
          </a>

          {/* WhatsApp Button */}
          <a
            href={`https://api.whatsapp.com/send?text=https://yourwebsite.com/posts/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#128C7E] transition duration-300 shadow-lg"
          >
            <FaWhatsapp className="text-white w-7 h-7" />
          </a>
        </div>

        {/* Footer with Author and Date */}
        <div className="mt-8 flex justify-between items-center border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-500">
            <span>Written by: </span>
            <span className="font-semibold text-[#a3386c]">Swarna Bese</span>
          </div>
          <div className="text-sm text-gray-500">
            <span>Published on: </span>
            <span className="font-semibold text-[#a3386c]">
              November 14, 2024
            </span>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-8 bg-[#f8f9fa] p-8 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold text-[#a3386c] text-center mb-6">
            Related Posts
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.slice(0, 3).map((relatedPost: any) => (
              <li key={relatedPost.id}>
                <a
                  href={`/posts/${relatedPost.id}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:bg-[#f0d0d6] hover:text-[#6f2851] p-6"
                >
                  <h4 className="text-xl font-semibold text-[#a3386c] mb-3">
                    {relatedPost.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {relatedPost.body.slice(0, 100)}...
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-block py-2 px-6 rounded-full text-white bg-[#a3386c] hover:bg-[#6f2851] transition duration-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
