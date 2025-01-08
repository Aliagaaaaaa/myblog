import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import type { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const { currentLanguage } = useBlog();
  const translation = post.translations[currentLanguage] || post.translations[post.defaultLanguage];

  return (
    <Link 
      to={`/post/${post.id}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
        {translation.title}
      </h2>
      <div className="flex items-center gap-2 mt-2 text-gray-600">
        <Calendar size={16} />
        <time dateTime={translation.publishedAt}>
          {format(new Date(translation.publishedAt), 'MMMM d, yyyy')}
        </time>
      </div>
      <p className="mt-3 text-gray-600 line-clamp-2">
        {translation.excerpt}
      </p>
    </Link>
  );
}