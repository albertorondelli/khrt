import { MetadataRoute } from "next";

import productSitemap from "./product"
import categorySitemap from "./category"
import collectionSitemap from "./collection"


export async function generateSitemaps() {
    return [
        { id: 0 }, // For products
        { id: 1 }, // For categories
        { id: 2 }, // For collections
    ];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
    const urls = [];

    switch (id) {
        case 0: urls.push(...(await productSitemap())); break;
        case 1: urls.push(...(await categorySitemap())); break;
        case 2: urls.push(...(await collectionSitemap())); break;

        default: throw new Error('Unknown sitemap id');
    }

    return urls;
}