import type { Metadata } from 'next';
import UseCaseRoutePage, { useCaseMetadata } from '@/app/components/UseCaseRoutePage';

export const metadata: Metadata = useCaseMetadata('oem-white-label');

export default function Page() {
  return <UseCaseRoutePage slug="oem-white-label" />;
}
