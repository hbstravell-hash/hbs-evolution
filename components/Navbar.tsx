import React from 'react';
import Link from 'next/link';
import AccountNav from './AccountNav';

const h = React.createElement;

const links = [
{ href: '/', label: 'الرئيسية' },
{ href: '/destinations', label: 'الوجهات' },
{ href: '/packages', label: 'الباكيجات' },
{ href: '/activities', label: 'الأنشطة والجولات' },
{ href: '/custom-trip', label: 'صمم رحلتك' },
{ href: '/booking', label: 'الحجز' },
{ href: '/about', label: 'من نحن' },
{ href: '/contact', label: 'اتصل بنا' },
{ href: '/blog', label: 'المدونة' }
];

export default function Navbar() {
return h(
'header',
{ style: { backgroundColor: '#0f2a3a', color: '#f6efe3', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 4px 18px rgba(0,0,0,0.18)' } },
h(
'div',
{ className: 'container-p', style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', paddingTop: '14px', paddingBottom: '14px', gap: '10px' } },
h(
Link,
{ href: '/', style: { display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' } },
h('img', { src: 'https://hbstravel.ge/logo.png', alt: 'HBS Travel', style: { height: '38px', width: '38px', objectFit: 'contain', borderRadius: '8px' } }),
h('span', { style: { fontWeight: 800, fontSize: '22px', color: '#f6efe3', letterSpacing: '0.3px' } }, 'HBS Travel')
),
h(
'nav',
{ style: { display: 'flex', flexWrap: 'wrap', gap: '18px', justifyContent: 'center' } },
links.map((l) => h(Link, { key: l.href, href: l.href, className: 'nav-link', style: { color: '#f6efe3', textDecoration: 'none', fontSize: '14px' } }, l.label))
),
h(AccountNav, {}),
h(
'select',
{ 'aria-label': 'اختر العملة', style: { backgroundColor: '#0e5a63', color: '#ffffff', border: 'none', borderRadius: '999px', padding: '7px 14px', fontSize: '13px', cursor: 'pointer' } },
h('option', {}, 'ر.س SAR'),
h('option', {}, 'د.إ AED'),
h('option', {}, 'د.ك KWD'),
h('option', {}, 'USD $')
)
)
);
}
