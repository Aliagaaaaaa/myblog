import { Globe } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import type { Language } from '../types/blog';
import { useParams } from 'react-router-dom';

const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português'
};

export function LanguageSelector() {
  const { id } = useParams<{ id: string }>();
  const { currentLanguage, setLanguage, posts } = useBlog();
  const post = posts.find(p => p.id === id);
  
  if (!post) return null;
  
  const availableLanguages = Object.keys(post.translations) as Language[];
  
  if (availableLanguages.length <= 1) return null;

  return (
    <div className="relative inline-block">
      <select
        value={currentLanguage}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="appearance-none bg-transparent pl-8 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {languageNames[lang]}
          </option>
        ))}
      </select>
      <Globe size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
}