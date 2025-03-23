import EnterPage from '@/page/EnterPage';
import { sanityFetch } from '@/sanity/lib/live';
import { settingsQuery } from '@/sanity/lib/queries';
import { SettingsQueryResult } from '../../../sanity.types';

export default async function Home() {
  const { data: settings }: { data: SettingsQueryResult } = await sanityFetch({
    query: settingsQuery,
  });

  return <EnterPage settings={settings} />;
}
