interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="my-6 rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 text-gray-200 text-sm">
        {language}
      </div>
      <pre className="bg-gray-900 p-4 overflow-x-auto">
        <code className="text-gray-200 text-sm font-mono whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}