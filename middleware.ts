import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for SEO arrays, APIs, Next static blocks, and Next images.
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml).*)']
};
