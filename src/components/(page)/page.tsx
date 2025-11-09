import { fetchHomePageQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import { FetchHomePageQueryResult } from '../../../sanity.types';
import { HomeContent } from './HomeContent';

export async function generateMetadata() {
  const { data: page } = await sanityFetch({
    query: fetchHomePageQuery,
  });

  return generateSeoMetadata({
    slug: '',
    page: page,
  });
}

export default async function Page() {
  const { data }: { data: FetchHomePageQueryResult } = await sanityFetch({
    query: fetchHomePageQuery,
  });
  const enterSiteText = data?.enterSiteText;

  return <HomeContent enterSiteText={enterSiteText || '( Coming Soon )'} />;
}
