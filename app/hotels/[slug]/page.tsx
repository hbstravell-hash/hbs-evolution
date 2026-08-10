import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { hotels, packages } from '../../../lib/data';

const h = React.createElement;

export function generateStaticParams() {
return hotels.map((hh) => ({ slug: hh.slug }));
}

export default function HotelPage({ params }: { params: { slug: string } }) {
const hotel = hotels.find((hh) => hh.slug === params.slug);
if (!hotel) return notFound();

const relatedPackages = packages.filter((p) => p.hotels.includes(hotel.slug));

return h(
'div',
{ className: 'container-p', style: { padding: '28px 20px' } },
h('img', { src: hotel.image, alt: hotel.name, style: { height: '260px', width: '100%', objectFit: 'cover', borderRadius: '14px', marginBottom: '20px' } }),
h('h1', { style: { fontSize: '28px', fontWeight: 800, marginBottom: '6px' } }, hotel.name),
h('p', { style: { marginBottom: '10px' } }, '⭐'.repeat(hotel.stars) + ' — ' + hotel.city),
h('p', { style: { fontSize: '15px', lineHeight: 1.9, marginBottom: '18px' } }, hotel.description),
h(
'div',
{ className: 'card', style: { padding: '18px', marginBottom: '24px' } },
h('h3', { style: { fontWeight: 800, marginBottom: '10px' } }, 'المرافق والخدمات'),
h(
'ul',
{ style: { paddingRight: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' } },
hotel.amenities.map((a) => h('li', { key: a }, a))
)
),
relatedPackages.length > 0
? h(
'section',
{},
h('h2', { style: { fontSize: '20px', fontWeight: 800, marginBottom: '12px' } }, 'باكيجات تستخدم هذا الفندق'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' } },
relatedPackages.map((p) =>
h(
Link,
{ key: p.slug, href: '/packages/' + p.slug, className: 'card', style: { padding: '14px', textDecoration: 'none', color: 'inherit' } },
h('div', { style: { fontWeight: 700 } }, p.title)
)
)
)
)
: null
);
}
