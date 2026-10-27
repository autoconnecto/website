import type { Metadata } from 'next';
import UseCaseRoutePage, { useCaseMetadata } from '@/app/components/UseCaseRoutePage';

export const metadata: Metadata = useCaseMetadata('factory-energy-monitoring');

export default function Page() {
  return <UseCaseRoutePage slug="factory-energy-monitoring" />;
}
