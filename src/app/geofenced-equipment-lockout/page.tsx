import type { Metadata } from 'next';
import UseCaseRoutePage, { useCaseMetadata } from '@/app/components/UseCaseRoutePage';

export const metadata: Metadata = useCaseMetadata('geofenced-equipment-lockout');

export default function Page() {
  return <UseCaseRoutePage slug="geofenced-equipment-lockout" />;
}
