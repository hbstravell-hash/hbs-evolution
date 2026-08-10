import React from 'react';
import Link from 'next/link';

const h = React.createElement;

const legalLinks = [
{ href: '/terms', label: 'الشروط والأحكام' },
{ href: '/cancellation-policy', label: 'سياسة الإلغاء' },
{ href: '/privacy', label: 'سياسة الخصوصية' },
{ href: '/about', label: 'من نحن' },
{ href: '/contact', label: 'اتصل بنا' },
{ href: '/blog', label: 'المدونة' },
{ href: '/admin', label: 'لوحة التحكم' }
];

const paymentBadges = [
{ label: '💳 PayPal', bg: '#ffc439', color: '#003087' },
{ label: '💳 Visa / Mastercard', bg: '#f6efe3', color: '#0f2a3a' },
{ label: '🪙 Crypto (BTC, ETH, USDT)', bg: 'rgba(217,164,65,0.18)', color: '#d9a441' }
];

const headingStyle = { fontWeight: 700, marginBottom: '12px', fontSize: '15px', color: '#d9a441', letterSpacing: '0.3px' };

export default function Footer() {
return h(
'footer',
{ style: { backgroundColor: '#0f2a3a', color: '#f6efe3', marginTop: '48px', borderTop: '3px solid #d9a441' } },
h(
'div',
{ className: 'container-p', style: { paddingTop: '40px', paddingBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '28px' } },
h(
'div',
{},
h(
'div',
{ style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' } },
h('img', { src: 'https://hbstravel.ge/logo.png', alt: 'HBS Travel', style: { height: '30px', width: '30px', objectFit: 'contain', borderRadius: '6px' } }),
h('span', { style: { fontWeight: 800, fontSize: '20px' } }, 'HBS Travel')
),
h('p', { style: { fontSize: '14px', lineHeight: 1.9, opacity: 0.85 } }, 'شريككم الموثوق لتنظيم رحلات جورجيا للعائلات والأفراد من دول الخليج، بخبرة محلية ومرشدين يتحدثون العربية.'),
h('p', { style: { fontSize: '13px', opacity: 0.75, marginTop: '10px' } }, 'رقم التسجيل الضريبي (Tax ID) في جورجيا: 404786656'),
h('p', { style: { fontSize: '13px', opacity: 0.75 } }, 'المكتب الرئيسي: شارع نينو وإيليا ناكاشيدزه، رقم 1 (أفليفي سابقاً)، شقة 3، مبنى 3، تبليسي، جورجيا')
),
h(
'div',
{},
h('div', { style: headingStyle }, 'روابط مهمة'),
h(
'ul',
{ style: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' } },
legalLinks.map((l) => h('li', { key: l.href }, h(Link, { href: l.href, className: 'nav-link', style: { color: '#f6efe3', textDecoration: 'none', fontSize: '14px', opacity: 0.85 } }, l.label)))
)
),
h(
'div',
{},
h('div', { style: headingStyle }, 'موقع المكتب'),
h(
'div',
{ className: 'gallery-placeholder', style: { height: '140px', borderRadius: '12px', fontSize: '13px' } },
'خريطة مكتب تبليسي'
),
h('p', { style: { fontSize: '13px', opacity: 0.75, marginTop: '10px' } }, 'يمكن للعملاء زيارة مكتبنا في تبليسي بعد تحديد موعد مسبق.')
),
h(
'div',
{},
h('div', { style: headingStyle }, 'تواصل معنا'),
h('p', { style: { fontSize: '14px', opacity: 0.85 } }, 'واتساب: 995555165926+'),
h('p', { style: { fontSize: '14px', opacity: 0.85 } }, 'البريد: info@hbstravel.ge'),
h('p', { style: { fontSize: '13px', opacity: 0.7, marginTop: '10px' } }, 'مواطنو دول الخليج يدخلون جورجيا بدون تأشيرة مسبقة.')
),
h(
'div',
{},
h('div', { style: headingStyle }, 'طرق الدفع المتاحة'),
h(
'div',
{ style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' } },
paymentBadges.map((b) =>
h(
'span',
{ key: b.label, className: 'badge-pill', style: { backgroundColor: b.bg, color: b.color, fontSize: '12px', fontWeight: 700 } },
b.label
)
)
),
h('p', { style: { fontSize: '12px', opacity: 0.7 } }, 'الدفع الإلكتروني الآمن متاح عبر شريكنا PayPal بنفس نظام الدفع المعتمد في hbstravel.ge، إضافة إلى الدفع نقداً أو بالبطاقة عند الوصول.')
)
),
h(
'div',
{ style: { borderTop: '1px solid rgba(246,239,227,0.15)', textAlign: 'center', padding: '16px', fontSize: '13px', opacity: 0.7 } },
'© ' + new Date().getFullYear() + ' HBS Travel LLC. جميع الحقوق محفوظة.'
)
);
}
