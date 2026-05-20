export type PublicPlan = {
  plan_id: string;
  display_name: string | null;
  price_monthly_inr: number | null;
  price_yearly_inr: number | null;
  max_users: number | null;
  max_dashboards: number | null;
  max_devices: number | null;
  telemetry_per_minute: number | null;
  telemetry_per_day: number | null;
  retention_days: number | null;
  min_telemetry_interval_sec: number | null;
  min_aggregation_interval_sec: number | null;
  whitelabel_enabled: boolean | null;
  description: string | null;
  sort_order: number | null;
  is_active: boolean | null;
  is_public_visible: boolean | null;
};
