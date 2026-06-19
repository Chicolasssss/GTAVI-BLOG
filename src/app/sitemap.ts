import { MetadataRoute } from 'next'
import { DATABASE_ENTRIES } from '@/lib/databaseData'
import { supabaseAdmin } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://leonidacitizen.com'
  
  // Static Routes
  const staticRoutes = [
    '',
    '/news',
    '/foro',
    '/db',
    '/timeline',
    '/sixm-hub',
    '/radar',
    '/mapa',
    '/test-pc',
    '/servers',
    '/gear',
    '/privacy',
    '/terms'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : route === '/news' ? 0.9 : 0.8,
  }))

  // Database Dynamic Routes
  const dbRoutes = DATABASE_ENTRIES.map((entry) => ({
    url: `${baseUrl}/db/${entry.category}/${entry.slug}`,
    lastModified: new Date(entry.date_added),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Dynamic Forum Posts and News Articles
  let forumRoutes: MetadataRoute.Sitemap = []
  let newsRoutes: MetadataRoute.Sitemap = []
  
  if (supabaseAdmin) {
    try {
      // Fetch Forum Posts
      const { data: posts } = await supabaseAdmin
        .from('posts')
        .select('id, created_at')
        .order('created_at', { ascending: false })
        .limit(1000)
        
      if (posts) {
        forumRoutes = posts.map((post) => ({
          url: `${baseUrl}/foro/${post.id}`,
          lastModified: new Date(post.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      }

      // Fetch News Articles
      const { data: articles } = await supabaseAdmin
        .from('articles')
        .select('slug, created_at')
        .order('created_at', { ascending: false })
        .limit(500)
        
      if (articles) {
        newsRoutes = articles.map((article) => ({
          url: `${baseUrl}/news/${article.slug}`,
          lastModified: new Date(article.created_at),
          changeFrequency: 'daily' as const,
          priority: 0.9,
        }))
      }
    } catch (e) {
      console.error("Error fetching sitemap dynamic data", e)
    }
  }

  return [...staticRoutes, ...dbRoutes, ...forumRoutes, ...newsRoutes]
}
