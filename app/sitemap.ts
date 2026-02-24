import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://vyleralabs.com';

    const languages = ['en', 'id', 'ru', 'ja']; // Specific application languages (ja not jp)

    // Core static routes WITHOUT the language prefix
    const routes = [
        '',
        '/about',
        '/tech',
        '/enterprise',
        '/investors'
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Loop through each route
    routes.forEach((route) => {
        // 1. Build the alternates object for this specific route
        const alternates = {
            languages: languages.reduce((acc, lang) => {
                acc[lang] = `${baseUrl}/${lang}${route}`;
                return acc;
            }, {} as Record<string, string>),
        };

        // 2. Create a dedicated sitemap entry for EACH language version
        languages.forEach((lang) => {
            sitemapEntries.push({
                url: `${baseUrl}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1.0 : 0.8,
                alternates: alternates,
            });
        });
    });

    return sitemapEntries;
}
