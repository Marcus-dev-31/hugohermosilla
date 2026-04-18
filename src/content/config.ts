import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const works = defineCollection({
  type: 'content',
  schema: z.object({
    title:          z.string(),
    category:       z.enum(['DJ Set', 'Video', 'Reel', 'Aftermovie', 'Mix']),
    year:           z.number(),
    client:         z.string().optional(),
    thumbnail:      z.string(),
    vimeoId:        z.string().optional(),
    soundcloudUrl:  z.string().optional(),
    featured:       z.boolean().default(false),
    order:          z.number(),
  }),
});

export const collections = { works };