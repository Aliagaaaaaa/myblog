import React, { createContext, useContext, useState, useEffect } from 'react';
import type { BlogPost, Language } from '../types/blog';

interface BlogContextType {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  availableLanguages: Language[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const availableLanguages: Language[] = ['en', 'es', 'pt'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const samplePosts: BlogPost[] = [
          {
            id: '1',
            defaultLanguage: 'en',
            translations: {
              en: {
                title: 'How to Use My Custom FACEIT API for Nightbot Commands on Twitch',
                excerpt: 'Learn how to set up Nightbot commands using my custom FACEIT API to provide real-time stats on Twitch.',
                content: [
                  {
                    type: 'paragraph',
                    content: 'With my custom FACEIT API, you can set up Twitch chat commands that provide real-time stats and information during your streams. This guide will help you create two essential commands: `!team` and `!enemy`, with an optional feature to display ELOs for each player.'
                  },
                  {
                    type: 'paragraph',
                    content: 'Before setting up the commands, you need to find your FACEIT ID. This ID ensures your commands won\'t break even if you change your username. Here\'s how to find it:'
                  },
                  {
                    type: 'paragraph',
                    content: '1. Open the following link in your browser:'
                  },
                  {
                    type: 'code',
                    language: 'plaintext',
                    content: 'https://faceitapi.lmao.cl/player?username=[PLAYER_USERNAME]'
                  },
                  {
                    type: 'paragraph',
                    content: '2. Replace `[PLAYER_USERNAME]` with your FACEIT username. For example:'
                  },
                  {
                    type: 'code',
                    language: 'plaintext',
                    content: 'https://faceitapi.lmao.cl/player?username=aliaga69'
                  },
                  {
                    type: 'paragraph',
                    content: '3. Open the link in your browser, and it will display a unique ID like this:'
                  },
                  {
                    type: 'code',
                    language: 'plaintext',
                    content: '519a8f9b-bdf9-49bd-99b8-0b6845271fc7'
                  },
                  {
                    type: 'paragraph',
                    content: 'Copy this FACEIT ID and keep it handy—you\'ll use it to set up the commands.'
                  },
                  {
                    type: 'spoiler',
                    title: 'Setting Up the !team Command',
                    content: [
                      {
                        type: 'paragraph',
                        content: 'The `!team` command allows your viewers to see your current FACEIT team during a match. Follow these steps to set it up in Nightbot:'
                      },
                      {
                        type: 'paragraph',
                        content: '1. Open your Twitch chat.\n2. Type the following command to add `!team` to Nightbot:'
                      },
                      {
                        type: 'code',
                        language: 'plaintext',
                        content: '!addcom !team $(urlfetch https://faceitapi.lmao.cl/currentmatch/team?userId=[FACEIT ID])'
                      },
                      {
                        type: 'paragraph',
                        content: 'Replace `[FACEIT ID]` with the ID you copied earlier. For example:'
                      },
                      {
                        type: 'code',
                        language: 'plaintext',
                        content: '!addcom !team $(urlfetch https://faceitapi.lmao.cl/currentmatch/team?userId=519a8f9b-bdf9-49bd-99b8-0b6845271fc7)'
                      },
                      {
                        type: 'paragraph',
                        content: 'Now, if you want to include ELOs for each player, you can use the optional `&elo=true` parameter. The command will look like this:'
                      },
                      {
                        type: 'code',
                        language: 'plaintext',
                        content: '!addcom !team $(urlfetch https://faceitapi.lmao.cl/currentmatch/team?userId=[FACEIT ID]&elo=true)'
                      },
                      {
                        type: 'paragraph',
                        content: 'With `&elo=true`, the output will display the ELOs for each player, like this:\nplayer1(1000), player2(1000), player3(1000), player4(1000), player5(1000)'
                      }
                    ]
                  },
                  {
                    type: 'spoiler',
                    title: 'Setting Up the !enemy Command',
                    content: [
                      {
                        type: 'paragraph',
                        content: 'The `!enemy` command shows information about the opposing team in your current FACEIT match. To set it up, follow these steps:'
                      },
                      {
                        type: 'paragraph',
                        content: '1. Open your Twitch chat.\n2. Type the following command to add `!enemy` to Nightbot:'
                      },
                      {
                        type: 'code',
                        language: 'plaintext',
                        content: '!addcom !enemy $(urlfetch https://faceitapi.lmao.cl/currentmatch/enemy?userId=[FACEIT ID])'
                      },
                      {
                        type: 'paragraph',
                        content: 'Replace `[FACEIT ID]` with the ID you copied earlier. For example:'
                      },
                      {
                        type: 'code',
                        language: 'plaintext',
                        content: '!addcom !enemy $(urlfetch https://faceitapi.lmao.cl/currentmatch/enemy?userId=519a8f9b-bdf9-49bd-99b8-0b6845271fc7)'
                      },
                      {
                        type: 'paragraph',
                        content: 'If you want to include ELOs for the opposing team, you can add the `&elo=true` parameter to the command. The updated command will look like this:'
                      },
                      {
                        type: 'code',
                        language: 'plaintext',
                        content: '!addcom !enemy $(urlfetch https://faceitapi.lmao.cl/currentmatch/enemy?userId=[FACEIT ID]&elo=true)'
                      },
                      {
                        type: 'paragraph',
                        content: 'With `&elo=true`, the output will display the ELOs for each enemy player, like this:\nenemy1(1200), enemy2(1200), enemy3(1200), enemy4(1200), enemy5(1200)'
                      }
                    ]
                  },
                  {
                    type: 'paragraph',
                    content: 'These commands, along with the new ELO display feature, make it easy for your viewers to stay informed about your current match. Enjoy using my FACEIT API to enhance your Twitch chat experience!'
                  }
                ],
                publishedAt: '2025-01-07'
              }
            }
          }
        ];
        
        setPosts(samplePosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <BlogContext.Provider value={{ 
      posts, 
      loading, 
      error, 
      currentLanguage, 
      setLanguage: setCurrentLanguage,
      availableLanguages 
    }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
