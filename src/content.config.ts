import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title:         z.string(),
    category:      z.enum(['DJ Set', 'Video', 'Reel', 'Aftermovie', 'Mix']),
    year:          z.number(),
    client:        z.string().optional(),
    thumbnail:     z.string(),
    vimeoId:       z.string().optional(),
    soundcloudUrl: z.string().optional(),
    featured:      z.boolean().default(false),
    order:         z.number(),
  }),
});

export const collections = { works };