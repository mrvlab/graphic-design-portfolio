import { fetchHomePageQuery, settingsQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import { SettingsQueryResult } from '../../../sanity.types';
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
  const { data: settings }: { data: SettingsQueryResult } = await sanityFetch({
    query: settingsQuery,
  });
  const enterSiteText = settings?.enterSiteText;

  return <HomeContent enterSiteText={enterSiteText || '( Coming Soon )'} />;
}
