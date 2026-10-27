import type { Metadata } from 'next';
import UseCaseRoutePage, { useCaseMetadata } from '@/app/components/UseCaseRoutePage';

export const metadata: Metadata = useCaseMetadata('cold-chain-monitoring');

export default function Page() {
  return <UseCaseRoutePage slug="cold-chain-monitoring" />;
}
