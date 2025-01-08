import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { useBlog } from '../context/BlogContext';
import { CodeBlock } from '../components/CodeBlock';
import { ImageBlock } from '../components/ImageBlock';
import { SpoilerBlock } from '../components/SpoilerBlock';
import { LanguageSelector } from '../components/LanguageSelector';
import type { Block } from '../types/blog';

export function PostPage() {
  const { id } = useParams<{ id: string }>();
  const { posts, loading, error, currentLanguage } = useBlog();
  const post = posts.find((p) => p.id === id);
  const translation = post?.translations[currentLanguage] || post?.translations[post.defaultLanguage];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: translation?.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {block.content}
          </p>
        );
      case 'code':
        return (
          <CodeBlock
            key={index}
            code={block.content}
            language={block.language}
          />
        );
      case 'image':
        return (
          <ImageBlock
            key={index}
            url={block.url}
            caption={block.caption}
          />
        );
      case 'spoiler':
        return (
          <SpoilerBlock
            key={index}
            title={block.title}
            content={block.content}
            renderBlock={renderBlock}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !post || !translation) {
    return (
      <div className="text-center text-red-600 py-8">
        {error || 'Post not found'}
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to posts
        </Link>
        <LanguageSelector />
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {translation.title}
        </h1>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center text-gray-600">
            <Calendar size={20} className="mr-2" />
            <time dateTime={translation.publishedAt}>
              {format(new Date(translation.publishedAt), 'MMMM d, yyyy')}
            </time>
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Share post"
          >
            <Share2 size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="space-y-6">
          {translation.content.map((block, index) => renderBlock(block, index))}
        </div>
      </div>
    </article>
  );
}