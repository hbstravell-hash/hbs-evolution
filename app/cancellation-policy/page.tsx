import React from 'react';
import type { Metadata } from 'next';

const h = React.createElement;
export const metadata: Metadata = {
    title: 'سياسة الإلغاء والاسترجاع | HBS Evolution',
    description: 'تفاصيل سياسة الإلغاء والاسترجاع لحجوزات HBS Evolution.'
};
const rules = [
    'إلغاء مجاني بالكامل عند الإلغاء قبل 15 يوماً أو أكثر من تاريخ وصول الرحلة (تختلف المدة حسب نوع الباقة الموضح في صفحتها).',
    'خصم 25% من قيمة الحجز عند الإلغاء بين 7 و14 يوماً قبل الوصول.',
    'خصم 50% من قيمة الحجز عند الإلغاء بين 3 و6 أيام قبل الوصول.',
    'لا يوجد استرجاع للعربون عند الإلغاء قبل أقل من 72 ساعة من موعد الوصول.',
    'في حال عدم الحضور دون إشعار مسبق، لا يحق للعميل استرجاع أي مبلغ مدفوع.',
    'يمكن تأجيل الرحلة بدلاً من إلغائها مرة واحدة دون رسوم إضافية إذا تم الإشعار قبل 10 أيام على الأقل.',
    'في حالات الطوارئ الصحية الموثقة، تنظر الشركة في كل حالة على حدة لتقديم أفضل حل ممكن للعميل.'
  ];
export default function CancellationPolicyPage() {
    return h(
          'div',
      { className: 'container-p', style: { padding: '32px 20px', maxWidth: '820px' } },
          h('h1', { style: { fontSize: '28px', fontWeight: 800, marginBottom: '18px' } }, 'سياسة الإلغاء والاسترجاع'),
          h(
                  'ul',
            { style: { paddingRight: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '15px', lineHeight: 1.9 } },
                  rules.map((r) => h('li', { key: r }, r))
                )
        );
}
