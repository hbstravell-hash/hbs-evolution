import React from 'react';
import type { Metadata } from 'next';

const h = React.createElement;
export const metadata: Metadata = {
title: 'من نحن | HBS Travel',
description: 'HBS Travel LLC شركة متخصصة في تنظيم رحلات جورجيا لعملاء دول الخليج.'
};
const values = [
{ title: 'خبرة محلية', text: 'فريقنا مقيم في جورجيا ويعرف كل تفصيلة في الوجهات والفنادق والطرق.' },
{ title: 'عربية أصيلة', text: 'نتحدث لغتكم فعلاً، لا ترجمة آلية ولا حواجز تواصل.' },
{ title: 'شفافية تامة', text: 'أسعار واضحة، يشمل ولا يشمل مكتوب بالتفصيل قبل الحجز.' },
{ title: 'دعم متواصل', text: 'فريق دعم عبر واتساب متاح طوال رحلتكم في جورجيا.' }
];
export default function AboutPage() {
return h(
'div',
{ className: 'container-p', style: { padding: '32px 20px', maxWidth: '860px' } },
h(
'div',
{ style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' } },
h('img', { src: 'https://hbstravel.ge/logo.png', alt: 'HBS Travel', style: { height: '48px', width: '48px', objectFit: 'contain' } }),
h('h1', { style: { fontSize: '28px', fontWeight: 800 } }, 'من نحن')
),
h('p', { style: { fontSize: '15px', lineHeight: 1.9, marginBottom: '18px' } }, 'HBS Travel LLC شركة سياحية متخصصة في تنظيم رحلات جورجيا لعائلات وأفراد دول الخليج، تأسست لتقديم تجربة سفر مريحة وآمنة تراعي اللغة والعادات والاحتياجات الخاصة بضيوفنا من الخليج العربي.'),
h('p', { style: { fontSize: '15px', lineHeight: 1.9, marginBottom: '28px' } }, 'نفخر بفريق محلي في تبليسي يعمل يومياً على تحديث البرامج والفنادق والأنشطة لضمان أعلى مستوى من الجودة والراحة لكل ضيف.'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' } },
values.map((v) =>
h(
'div',
{ key: v.title, className: 'card', style: { padding: '18px' } },
h('h3', { style: { fontWeight: 800, marginBottom: '8px', color: '#0e5a63' } }, v.title),
h('p', { style: { fontSize: '14px', lineHeight: 1.8 } }, v.text)
)
)
)
);
}
