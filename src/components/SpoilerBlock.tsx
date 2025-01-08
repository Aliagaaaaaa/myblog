import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Block } from '../types/blog';

interface SpoilerBlockProps {
  title: string;
  content: Block[];
  renderBlock: (block: Block, index: number) => React.ReactNode;
}

export function SpoilerBlock({ title, content, renderBlock }: SpoilerBlockProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-6 border rounded-lg dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-t-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white">{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="p-4 space-y-4">
          {content.map((block, index) => renderBlock(block, index))}
        </div>
      )}
    </div>
  );
}