interface ImageBlockProps {
  url: string;
  caption: string;
}

export function ImageBlock({ url, caption }: ImageBlockProps) {
  return (
    <figure className="my-8">
      <img
        src={url}
        alt={caption}
        className="w-full rounded-lg"
        loading="lazy"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}