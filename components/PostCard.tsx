import Image from 'next/image';
import { FaThumbsUp, FaThumbsDown, FaHeart } from 'react-icons/fa';
import Link from 'next/link';

type PostCardProps = {
  id: number;
  title: string;
  body: string;
  reactions: {
    likes: number;
    dislikes: number;
    loves: number;
  };
};

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  body,
  reactions
}) => {
  return (
    <Link href={`/posts/${id}`} passHref>
      <div className="bg-[#f0d0d6] p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:rotate-3 hover:scale-105 hover:translate-x-2 hover:translate-y-2 hover:shadow-2xl hover:outline-none hover:ring-4 hover:ring-pink-500 cursor-pointer">
        <div className="flex items-center space-x-4">
          <Image
            src='/Images/home-og-image.jpg'
            alt={'blogg'}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900">{'Swarna Bese'}</p>
            <p className="text-sm text-gray-500">{'Software Engineer'}</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mt-4">{title}</h2>

        <p className="mt-4 text-gray-600">{body.slice(0, 150)}...</p>

        <div className="mt-4 flex justify-between items-center text-gray-600">
          <span className="text-[#a3386c] hover:text-blue-600 font-semibold">
            Read More
          </span>

          <div className="flex space-x-6">
            {/* Likes */}
            <div className="flex items-center space-x-2">
              <FaThumbsUp className="text-blue-500" />
              <span>{reactions.likes}</span>
            </div>

            {/* Dislikes */}
            <div className="flex items-center space-x-2">
              <FaThumbsDown className="text-red-500" />
              <span>{reactions.dislikes}</span>
            </div>

            {/* Loves */}
            <div className="flex items-center space-x-2">
              <FaHeart className="text-pink-500" />
              <span>143</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
