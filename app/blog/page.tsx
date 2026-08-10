import React from 'react';
import type { Metadata } from 'next';

const h = React.createElement;
export const metadata: Metadata = {
title: 'المدونة | HBS Travel',
description: 'مقالات ونصائح سفر عن السياحة في جورجيا لعائلات وأفراد دول الخليج.'
};
const posts = [
{ title: 'دليلك الشامل للسياحة في باتومي', excerpt: 'أفضل الأماكن والأنشطة على شواطئ البحر الأسود لعائلتك.', image: 'https://images.unsplash.com/photo-1625566360146-918001e76064?auto=format&fit=crop&w=800&q=80' },
{ title: 'أفضل وقت لزيارة كازبيجي وطريق جورجيا العسكري', excerpt: 'كل ما تحتاج معرفته قبل رحلتك إلى الجبال.', image: 'https://images.unsplash.com/photo-1563284223-333497472e88?auto=format&fit=crop&w=800&q=80' },
{ title: 'خمس تجارب لا تفوتها في تبليسي القديمة', excerpt: 'من الحمامات الكبريتية إلى تلفريك ناريقالا.', image: 'https://images.unsplash.com/photo-1603350576276-24747f7bbf40?auto=format&fit=crop&w=800&q=80' },
{ title: 'السفر إلى جورجيا مع الأطفال: نصائح عملية', excerpt: 'كيف تخطط لرحلة عائلية مريحة وممتعة للصغار والكبار.', image: 'https://images.unsplash.com/photo-1776763018821-8feeaeeee0a5?auto=format&fit=crop&w=800&q=80' },
{ title: 'موسم الثلوج في باكورياني وبورجومي', excerpt: 'أفضل الأنشطة الشتوية المناسبة للعائلات الخليجية.', image: 'https://images.unsplash.com/photo-1550563405-9081212d79f5?auto=format&fit=crop&w=800&q=80' },
{ title: 'كل ما تحتاج معرفته عن الدخول إلى جورجيا لمواطني الخليج', excerpt: 'شروط الدخول والإقامة وأهم النصائح قبل السفر.', image: 'https://images.unsplash.com/photo-1632245810768-87c58b1ad973?auto=format&fit=crop&w=800&q=80' }
];
export default function BlogPage() {
return h(
'div',
{ className: 'container-p', style: { padding: '32px 20px' } },
h('h1', { style: { fontSize: '28px', fontWeight: 800, marginBottom: '18px' } }, 'المدونة'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' } },
posts.map((p) =>
h(
'div',
{ key: p.title, className: 'card' },
h('img', { src: p.image, alt: p.title, style: { height: '130px', width: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' } }),
h(
'div',
{ style: { padding: '14px' } },
h('h2', { style: { fontSize: '16px', fontWeight: 700, marginBottom: '6px' } }, p.title),
h('p', { style: { fontSize: '13px', opacity: 0.75 } }, p.excerpt)
)
)
)
)
);
}
