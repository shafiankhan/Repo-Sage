"use client";

import { BillingOverview } from '@/components/billing/billing-overview';
import { PlanComparison } from '@/components/billing/plan-comparison';
import { UsageMetrics } from '@/components/billing/usage-metrics';

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Billing</h1>
        <p className="text-gray-400 mt-1">Manage your subscription and usage.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <BillingOverview />
            <PlanComparison />
          </div>
        </div>
        <div>
          <UsageMetrics />
        </div>
      </div>
    </div>
  );
}