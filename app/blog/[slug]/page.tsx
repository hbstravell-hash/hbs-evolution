import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, packages } from '../../../lib/data';

const h = React.createElement;

export function generateStaticParams() {
return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
const post = blogPosts.find((p) => p.slug === params.slug);
if (!post) return {};
return {
title: post.title + ' | HBS Travel',
description: post.excerpt
};
}

function renderBlock(block: any, i: number) {
if (block.type === 'h2') {
return h('h2', { key: i, style: { fontSize: '21px', fontWeight: 800, margin: '28px 0 12px' } }, block.text);
}
if (block.type === 'ul') {
return h(
'ul',
{ key: i, style: { paddingRight: '20px', margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px', lineHeight: 1.8 } },
block.items.map((it: string, j: number) => h('li', { key: j }, it))
);
}
return h('p', { key: i, style: { fontSize: '15px', lineHeight: 1.95, marginBottom: '14px', opacity: 0.92 } }, block.text);
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
const post = blogPosts.find((p) => p.slug === params.slug);
if (!post) return notFound();

const relatedPackage = packages.find((p) => p.slug === post.relatedPackageSlug);
const whatsappHref = 'https://wa.me/995555165926?text=' + encodeURIComponent('مرحباً، قرأت مقال "' + post.title + '" وأرغب بمعرفة تفاصيل أكثر.');

return h(
'div',
{},
h('img', { src: post.image, alt: post.title, style: { height: '320px', width: '100%', objectFit: 'cover' } }),
h(
'div',
{ className: 'container-p', style: { padding: '28px 20px', maxWidth: '760px' } },
h(Link, { href: '/blog', style: { fontSize: '13px', fontWeight: 700, color: '#0e5a63', textDecoration: 'none' } }, '← عودة إلى المدونة'),
h('h1', { style: { fontSize: '30px', fontWeight: 800, margin: '14px 0 8px', lineHeight: 1.4 } }, post.title),
h('div', { style: { display: 'flex', gap: '14px', fontSize: '13px', opacity: 0.65, marginBottom: '22px' } }, h('span', {}, post.date), h('span', {}, '·'), h('span', {}, post.readTime)),
h('div', {}, post.content.map((b: any, i: number) => renderBlock(b, i))),
h(
'div',
{ className: 'card', style: { padding: '24px', marginTop: '28px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(14,90,99,0.06), rgba(184,134,43,0.06))' } },
h('div', { style: { fontWeight: 800, fontSize: '18px', marginBottom: '8px' } }, 'هل تريدون تحويل هذه الفكرة إلى رحلة حقيقية؟'),
h('p', { style: { fontSize: '14px', opacity: 0.8, marginBottom: '18px' } }, 'فريق HBS Travel جاهز لتصميم برنامجكم أو تعديل باقة جاهزة بما يناسب عائلتكم، مع مرشد عربي وخدمة متكاملة من البداية للنهاية.'),
h(
'div',
{ style: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' } },
relatedPackage ? h(Link, { href: '/packages/' + relatedPackage.slug, className: 'btn-primary' }, 'شاهد باقة ' + relatedPackage.title) : h(Link, { href: '/packages', className: 'btn-primary' }, 'تصفح الباكيجات'),
h('a', { href: whatsappHref, target: '_blank', rel: 'noopener noreferrer', className: 'btn-whatsapp' }, 'تواصل عبر واتساب')
)
)
)
);
}
