import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts } from '../../lib/data';

const h = React.createElement;
export const metadata: Metadata = {
title: 'المدونة | HBS Travel',
description: 'مقالات ونصائح سفر عن السياحة في جورجيا لعائلات وأفراد دول الخليج.'
};

export default function BlogPage() {
return h(
'div',
{ className: 'container-p', style: { padding: '32px 20px' } },
h('h1', { className: 'section-title' }, 'المدونة'),
h('p', { className: 'section-sub' }, 'نصائح سفر ومقالات مستفيضة عن أجمل وجهات جورجيا، لمساعدتكم على التخطيط لرحلتكم القادمة.'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '18px' } },
blogPosts.map((p) =>
h(
Link,
{ key: p.slug, href: '/blog/' + p.slug, className: 'card', style: { textDecoration: 'none', color: 'inherit', display: 'block' } },
h('img', { src: p.image, alt: p.title, style: { height: '150px', width: '100%', objectFit: 'cover' } }),
h(
'div',
{ style: { padding: '16px' } },
h('div', { style: { fontSize: '12px', opacity: 0.6, marginBottom: '6px' } }, p.date + ' · ' + p.readTime),
h('h2', { style: { fontSize: '16px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.5 } }, p.title),
h('p', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '10px' } }, p.excerpt),
h('span', { style: { fontSize: '13px', fontWeight: 700, color: '#0e5a63' } }, 'اقرأ المقال ←')
)
)
)
)
);
}
