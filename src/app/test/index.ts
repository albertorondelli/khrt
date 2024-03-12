
import productSitemap from './product';
import categorySitemap from './category';
import collectionSitemap from './collection';
import { MetadataRoute } from 'next';

// Il sitemap deve mappa lingua e regione: formato sitemap/sitemap_categories_it.xml

export default async function sitemap({ params }: { params: { countryCode: string; id: string} }): Promise<MetadataRoute.Sitemap> {
    const countryCode = params.countryCode; 
    const id  = parseInt(params.id, 10); // Ensure id is a number

    const urls = [];
    switch (id) {
        case 0: urls.push(...(await productSitemap())); break;
        case 1: urls.push(...(await categorySitemap())); break;
        case 2: urls.push(...(await collectionSitemap())); break;

        default: throw new Error('Unknown sitemap id');
    }

    return urls;
}
