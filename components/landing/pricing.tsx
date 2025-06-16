"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';
import Link from 'next/link';

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
    cta: "Start Free Trial",
    href: "/auth/signup",
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
    cta: "Start Free Trial",
    href: "/auth/signup?plan=pro",
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
    cta: "Start Free Trial",
    href: "/auth/signup?plan=team",
    popular: false,
  },
];

export function LandingPricing() {
  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the perfect plan for your development needs. Start free and scale as you grow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="gradient-bg px-4 py-2 rounded-full flex items-center gap-2">
                    <Star className="w-4 h-4 text-white" />
                    <span className="text-sm font-semibold text-white">Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className={`glass-card rounded-xl p-8 h-full hover:bg-white/10 transition-all duration-300 ${
                plan.popular ? 'border-blue-500/50 bg-blue-500/5' : ''
              }`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-400">{plan.period}</span>}
                  </div>
                  <p className="text-gray-300">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'gradient-bg text-white' 
                      : 'border-white/20 text-white hover:bg-white/5'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                  asChild
                >
                  <Link href={plan.href}>
                    {plan.cta}
                    {plan.popular && <Zap className="ml-2 w-4 h-4" />}
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            All plans include 14-day free trial • No credit card required • Cancel anytime
          </p>
          <Link href="/enterprise" className="text-blue-400 hover:text-blue-300 underline">
            Need an enterprise solution? Contact us →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}