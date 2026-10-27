import type { Metadata } from 'next';
import UseCaseRoutePage, { useCaseMetadata } from '@/app/components/UseCaseRoutePage';

export const metadata: Metadata = useCaseMetadata('water-tank-monitoring');

export default function Page() {
  return <UseCaseRoutePage slug="water-tank-monitoring" />;
}
