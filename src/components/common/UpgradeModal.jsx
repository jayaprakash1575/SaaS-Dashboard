import React, { useState } from 'react';
import { Check, Sparkles, Zap, ShieldCheck, HeartHandshake } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

export const UpgradeModal = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = useState('yearly');

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'yearly' ? '$19' : '$25',
      period: '/mo',
      desc: 'Perfect for small teams and solo SaaS creators',
      features: ['Up to 5 team members', '10GB cloud storage', 'Standard analytics', 'Email support'],
      popular: false,
    },
    {
      name: 'Pro Base',
      price: billingCycle === 'yearly' ? '$49' : '$59',
      period: '/mo',
      desc: 'Ideal for scaling businesses with higher volume',
      features: [
        'Unlimited team members',
        '100GB cloud storage',
        'Custom domain & branding',
        'Advanced realtime analytics',
        'Priority 24/7 support',
      ],
      popular: true,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Unlock Base Pro"
      subtitle="Supercharge your SaaS operations with automated invoices & analytics"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Billing cycle toggle */}
        <div className="flex items-center justify-center">
          <div className="p-1 bg-slate-100 rounded-2xl flex items-center gap-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#1B2559] shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-[#4318FF] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>Annual billing</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-400 text-slate-900 text-[10px] font-extrabold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl p-6 border transition-all relative flex flex-col justify-between ${
                p.popular
                  ? 'border-[#4318FF] bg-gradient-to-b from-[#F4F7FE] to-white shadow-soft ring-2 ring-[#4318FF]/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#4318FF] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                  Most Popular
                </span>
              )}

              <div>
                <h4 className="text-lg font-bold text-[#1B2559]">{p.name}</h4>
                <p className="text-xs text-slate-400 mt-1 mb-4">{p.desc}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-[#1B2559]">
                    {p.price}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {p.period}
                  </span>
                </div>

                <div className="space-y-2.5 mb-6">
                  {p.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant={p.popular ? 'primary' : 'secondary'}
                className="w-full text-xs sm:text-sm font-bold"
                onClick={() => {
                  alert(`Thank you for selecting the ${p.name} plan! Redirecting to secure checkout.`);
                  onClose();
                }}
              >
                Choose {p.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default UpgradeModal;

