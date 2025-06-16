"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

export function BillingOverview() {
  const currentPlan = {
    name: 'Pro',
    price: '$19',
    period: '/month',
    status: 'active',
    nextBilling: 'February 15, 2024',
    paymentMethod: '**** **** **** 4242',
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">{currentPlan.name}</h3>
              <p className="text-gray-400">
                {currentPlan.price}{currentPlan.period}
              </p>
            </div>
            <Badge className="bg-green-500/20 text-green-400">
              <CheckCircle className="w-3 h-3 mr-1" />
              {currentPlan.status}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Calendar className="w-4 h-4" />
                Next billing date
              </div>
              <p className="text-white font-medium">{currentPlan.nextBilling}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <CreditCard className="w-4 h-4" />
                Payment method
              </div>
              <p className="text-white font-medium">{currentPlan.paymentMethod}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              Change Plan
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              Update Payment
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            Billing Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-white font-medium">Usage approaching limit</p>
                <p className="text-sm text-gray-400">
                  You've used 85% of your monthly AI queries. Consider upgrading to avoid interruptions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}