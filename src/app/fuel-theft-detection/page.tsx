import type { Metadata } from 'next';
import UseCaseRoutePage, { useCaseMetadata } from '@/app/components/UseCaseRoutePage';

export const metadata: Metadata = useCaseMetadata('fuel-theft-detection');

export default function Page() {
  return <UseCaseRoutePage slug="fuel-theft-detection" />;
}
