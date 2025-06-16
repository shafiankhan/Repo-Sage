"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individual developers",
    features: [
      "5 repositories",
      "100 AI queries/month", 
      "Basic meeting transcription",
      "7-day history",
      "Community support"
    ],
    current: false,
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Ideal for professional developers",
    features: [
      "Unlimited repositories",
      "1,000 AI queries/month",
      "Advanced meeting intelligence",
      "30-day history",
      "File upload & analysis",
      "Priority support"
    ],
    current: true,
    popular: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "Built for development teams",
    features: [
      "Everything in Pro",
      "5,000 AI queries/month",
      "Team collaboration tools",
      "90-day history",
      "Advanced analytics",
      "SSO integration",
      "24/7 priority support"
    ],
    current: false,
    popular: false,
  },
];

export function PlanComparison() {
  return (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Available Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="gradient-bg px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className={`glass-card rounded-xl p-6 h-full border-white/10 ${
                plan.current ? 'border-blue-500/50 bg-blue-500/5' : ''
              }`}>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-400">{plan.period}</span>}
                  </div>
                  <p className="text-gray-300 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.current 
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                      : plan.popular
                      ? 'gradient-bg text-white' 
                      : 'border-white/20 text-white hover:bg-white/5'
                  }`}
                  variant={plan.current ? 'secondary' : plan.popular ? 'default' : 'outline'}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                  {plan.popular && !plan.current && <Zap className="ml-2 w-4 h-4" />}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}