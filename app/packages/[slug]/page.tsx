import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { packages, hotels } from '../../../lib/data';
import Accordion from '../../../components/Accordion';

const h = React.createElement;

export function generateStaticParams() {
return packages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
const pkg = packages.find((p) => p.slug === params.slug);
if (!pkg) return {};
return {
title: pkg.title + ' | HBS Travel',
description: 'برنامج تفصيلي لباقة ' + pkg.title + ' يشمل الفنادق والأسعار وكل ما تحتاجه لحجز رحلتك إلى جورجيا.'
};
}

export default function PackagePage({ params }: { params: { slug: string } }) {
const pkg = packages.find((p) => p.slug === params.slug);
if (!pkg) return notFound();

const pkgHotels = hotels.filter((hh) => pkg.hotels.includes(hh.slug));
const whatsappMsg = encodeURIComponent('مرحباً، أرغب بالاستفسار عن باقة: ' + pkg.title);
const whatsappHref = 'https://wa.me/995555165926?text=' + whatsappMsg;
const payHref = (method: string) => 'https://wa.me/995555165926?text=' + encodeURIComponent('مرحباً، أرغب بدفع العربون عبر ' + method + ' لباقة: ' + pkg.title);
const payPillStyle = { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '9999px', fontSize: '13px', fontWeight: 700, textDecoration: 'none' };

return h(
'div',
{ className: 'container-p', style: { padding: '28px 20px' } },
h('h1', { style: { fontSize: '30px', fontWeight: 800, marginBottom: '8px' } }, pkg.title),
h('p', { style: { opacity: 0.75, marginBottom: '20px' } }, pkg.cities.join(' • ') + ' — ' + pkg.days + ' أيام / ' + pkg.nights + ' ليالٍ'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' } },
pkg.gallery.map((src, n) =>
h('img', { key: n, src: src, alt: pkg.title + ' - صورة ' + (n + 1), style: { height: '140px', width: '100%', objectFit: 'cover', borderRadius: '10px' } })
)
),
h(
'div',
{ style: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' } },
h(Link, { href: '/booking?package=' + pkg.slug, className: 'btn-primary' }, 'احجز الآن'),
h('a', { href: whatsappHref, target: '_blank', rel: 'noopener noreferrer', className: 'btn-whatsapp' }, 'استفسار عبر واتساب')
),
h(
'div',
{ style: { display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '28px' } },
h('span', { style: { fontSize: '13px', fontWeight: 700, opacity: 0.7 } }, 'الدفع الآمن:'),
h('a', { href: payHref('PayPal'), target: '_blank', rel: 'noopener noreferrer', style: { ...payPillStyle, backgroundColor: '#ffc439', color: '#003087' } }, '💳 PayPal'),
h('a', { href: payHref('بطاقة ائتمانية/خصم عبر PayPal'), target: '_blank', rel: 'noopener noreferrer', style: { ...payPillStyle, backgroundColor: '#0f2a3a', color: '#fff' } }, '💳 بطاقة ائتمان'),
h('a', { href: payHref('عملات مشفرة (BTC, ETH, USDT)'), target: '_blank', rel: 'noopener noreferrer', style: { ...payPillStyle, backgroundColor: 'rgba(217,164,65,0.18)', color: '#b8862b' } }, '🪙 كريبتو')
),
h(
'section',
{ style: { marginBottom: '28px' } },
h('h2', { style: { fontSize: '22px', fontWeight: 800, marginBottom: '14px' } }, 'برنامج الرحلة يوماً بيوم'),
h(Accordion, { items: pkg.itinerary.map((d) => ({ title: 'اليوم ' + d.day + ': ' + d.title, content: d.details })) })
),
h(
'section',
{ style: { marginBottom: '28px' } },
h('h2', { style: { fontSize: '22px', fontWeight: 800, marginBottom: '14px' } }, 'الفنادق المستخدمة'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' } },
pkgHotels.map((hh) =>
h(
Link,
{ key: hh.slug, href: '/hotels/' + hh.slug, className: 'card', style: { overflow: 'hidden', textDecoration: 'none', color: 'inherit' } },
h('img', { src: hh.image, alt: hh.name, style: { height: '120px', width: '100%', objectFit: 'cover' } }),
h(
'div',
{ style: { padding: '14px' } },
h('div', { style: { fontWeight: 700, marginBottom: '4px' } }, hh.name + ' — ' + '⭐'.repeat(hh.stars)),
h('div', { style: { fontSize: '13px', opacity: 0.75 } }, hh.city),
h('div', { style: { fontSize: '13px', color: '#0e5a63', marginTop: '6px', fontWeight: 700 } }, 'عرض تفاصيل الفندق ←')
)
)
)
)
),
h(
'section',
{ style: { marginBottom: '28px' } },
h('h2', { style: { fontSize: '22px', fontWeight: 800, marginBottom: '14px' } }, 'جدول الأسعار'),
h(
'div',
{ className: 'card', style: { overflow: 'auto' } },
h(
'table',
{ style: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' } },
h(
'tbody',
{},
pkg.pricing.map((row) =>
h(
'tr',
{ key: row.label, style: { borderBottom: '1px solid #eee' } },
h('td', { style: { padding: '12px 16px', fontWeight: 600 } }, row.label),
h('td', { style: { padding: '12px 16px', fontWeight: 800, color: '#b8862b' } }, row.price + ' $')
)
),
h(
'tr',
{ style: { borderBottom: '1px solid #eee' } },
h('td', { style: { padding: '12px 16px', fontWeight: 600 } }, 'سعر الطفل (دون 12 سنة)'),
h('td', { style: { padding: '12px 16px', fontWeight: 800, color: '#b8862b' } }, pkg.childPrice + ' $')
),
h(
'tr',
{},
h('td', { style: { padding: '12px 16px', fontWeight: 600 } }, 'إضافة الغرفة المفردة'),
h('td', { style: { padding: '12px 16px', fontWeight: 800, color: '#b8862b' } }, '+' + pkg.singleSupplement + ' $')
)
)
)
)
),
h(
'section',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '28px' } },
h(
'div',
{ className: 'card', style: { padding: '18px' } },
h('h3', { style: { fontWeight: 800, marginBottom: '10px', color: '#0e5a63' } }, 'يشمل الباكيج'),
h('ul', { style: { paddingRight: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' } }, pkg.includes.map((it) => h('li', { key: it }, it)))
),
h(
'div',
{ className: 'card', style: { padding: '18px' } },
h('h3', { style: { fontWeight: 800, marginBottom: '10px', color: '#b8862b' } }, 'لا يشمل الباكيج'),
h('ul', { style: { paddingRight: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' } }, pkg.excludes.map((it) => h('li', { key: it }, it)))
)
),
h(
'section',
{ style: { marginBottom: '28px' } },
h('h2', { style: { fontSize: '22px', fontWeight: 800, marginBottom: '14px' } }, 'خريطة مسار الرحلة'),
h(
'div',
{ className: 'card', style: { padding: '20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' } },
pkg.routeStops.map((stop, i) =>
h(
React.Fragment,
{ key: stop },
h('span', { style: { backgroundColor: '#0e5a63', color: '#fff', padding: '8px 14px', borderRadius: '9999px', fontSize: '13px', fontWeight: 700 } }, stop),
i < pkg.routeStops.length - 1 ? h('span', { style: { opacity: 0.5 } }, '←') : null
)
)
)
),
h(
'section',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '28px' } },
h(
'div',
{ className: 'card', style: { padding: '18px' } },
h('h3', { style: { fontWeight: 800, marginBottom: '8px' } }, 'مدة الرحلة وأفضل موسم'),
h('p', { style: { fontSize: '14px' } }, pkg.days + ' أيام / ' + pkg.nights + ' ليالٍ'),
h('p', { style: { fontSize: '14px', marginTop: '6px' } }, pkg.bestSeason)
),
h(
'div',
{ className: 'card', style: { padding: '18px' } },
h('h3', { style: { fontWeight: 800, marginBottom: '8px' } }, 'سياسة الإلغاء'),
h('ul', { style: { paddingRight: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px' } }, pkg.cancellationPolicy.map((c) => h('li', { key: c }, c)))
)
),
h(
'section',
{ style: { marginBottom: '28px' } },
h('h2', { style: { fontSize: '22px', fontWeight: 800, marginBottom: '14px' } }, 'أسئلة شائعة'),
h(Accordion, { items: pkg.faqs.map((f) => ({ title: f.q, content: f.a })) })
),
h(
'section',
{},
h('h2', { style: { fontSize: '22px', fontWeight: 800, marginBottom: '14px' } }, 'باكيجات مشابهة'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' } },
packages
.filter((p) => pkg.similar.includes(p.slug))
.map((p) =>
h(
Link,
{ key: p.slug, href: '/packages/' + p.slug, className: 'card', style: { padding: '16px', textDecoration: 'none', color: 'inherit' } },
h('div', { style: { fontWeight: 700, marginBottom: '6px' } }, p.title),
h('div', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '8px' } }, p.days + ' أيام'),
h('div', { style: { fontWeight: 800, color: '#b8862b' } }, 'من ' + p.priceFrom + ' $')
)
)
)
),
h(
'div',
{
dangerouslySetInnerHTML: {
__html:
'<' + 'script type="application/ld+json">' +
JSON.stringify({
'@context': 'https://schema.org',
'@type': 'TouristTrip',
name: pkg.title,
description: pkg.bestSeason,
touristType: 'Family',
provider: { '@type': 'TravelAgency', name: 'HBS Travel LLC', telephone: '+995555165926', email: 'info@hbstravel.ge' }
}) +
'</' + 'script>'
}
}
)
);
}
