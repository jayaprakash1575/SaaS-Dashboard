import React from 'react';

export const Badge = ({ variant = 'default', children, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs md:text-sm',
    lg: 'px-3.5 py-1.5 text-sm font-semibold',
  };

  const variantClasses = {
    // Invoice status
    Complete: 'bg-[#E8F8EE] text-[#22C55E] font-medium border border-[#22C55E]/10',
    Pending: 'bg-[#FFF4E5] text-[#F59E0B] font-medium border border-[#F59E0B]/10',
    Cancel: 'bg-[#FFEBEB] text-[#EF4444] font-medium border border-[#EF4444]/10',
    
    // Order count badge
    cyan: 'bg-[#E6F8FF] text-[#00B5FF] font-semibold rounded-lg',
    
    // Task priorities
    Low: 'bg-[#FFE4E6] text-[#E11D48] font-medium',
    Medium: 'bg-[#FFEDD5] text-[#EA580C] font-medium',
    High: 'bg-[#E0F2FE] text-[#0284C7] font-medium',
    
    // Health status
    'On Track': 'bg-[#FEF3C7] text-[#D97706] font-medium',
    'At risk': 'bg-[#FFEBEB] text-[#DC2626] font-medium',

    // Generic
    default: 'bg-slate-100 text-slate-700',
    primary: 'bg-brand-50 text-brand-600 font-semibold',
    success: 'bg-emerald-50 text-emerald-600 font-medium',
    warning: 'bg-amber-50 text-amber-600 font-medium',
    danger: 'bg-rose-50 text-rose-600 font-medium',
  };

  const selectedVariant = variantClasses[variant] || variantClasses.default;
  const isPill = variant !== 'cyan';

  return (
    <span
      className={`inline-flex items-center justify-center font-medium transition-all ${
        isPill ? 'rounded-full' : 'rounded-lg'
      } ${sizeClasses[size] || sizeClasses.md} ${selectedVariant} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

