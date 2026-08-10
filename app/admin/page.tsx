'use client';
import React, { useState } from 'react';
import { packages } from '../../lib/data';

const h = React.createElement;
const mockBookings = [
{ id: 'B-1042', client: 'محمد العتيبي', pkg: 'سفانيتي والجبال المخفية', status: 'مؤكد', total: 1680 },
{ id: 'B-1041', client: 'سارة الكندري', pkg: 'جولة جورجيا الكبرى', status: 'بانتظار الدفع', total: 2760 },
{ id: 'B-1040', client: 'فهد الشمري', pkg: 'تبليسي وباتومي', status: 'مؤكد', total: 1040 }
];

const mockClients = [
{ name: 'محمد العتيبي', source: 'انستغرام', stage: 'تم الحجز', follow: 'لا يوجد متابعة مطلوبة' },
{ name: 'سارة الكندري', source: 'واتساب', stage: 'بانتظار الدفع', follow: 'إرسال تذكير عربون' },
{ name: 'نورة الدوسري', source: 'صمم رحلتك', stage: 'عرض سعر مُرسل', follow: 'متابعة خلال يومين' }
];

const mockReports = [
{ pkg: 'سفانيتي والجبال المخفية', cost: 280, price: 420, margin: 140 },
{ pkg: 'جولة جورجيا الكبرى', cost: 470, price: 690, margin: 220 },
{ pkg: 'تبليسي وباتومي', cost: 350, price: 520, margin: 170 }
];
export default function AdminPage() {
const [tab, setTab] = useState('overview');
const [quotePkg, setQuotePkg] = useState(packages[0].slug);
const [nights, setNights] = useState(3);
const [pax, setPax] = useState(2);
const [margin, setMargin] = useState(20);

const pkg = packages.find((p) => p.slug === quotePkg) || packages[0];
const baseCost = pkg.priceFrom * pax;
const finalPrice = Math.round(baseCost * (1 + margin / 100));

const tabs = [
{ key: 'overview', label: 'نظرة عامة' },
{ key: 'packages', label: 'الباكيجات' },
{ key: 'bookings', label: 'الحجوزات' },
{ key: 'quote', label: 'مولّد عروض الأسعار' },
{ key: 'crm', label: 'العملاء (CRM)' },
{ key: 'reports', label: 'التقارير' }
];

const navBtn = (key: string) => ({
padding: '10px 16px',
borderRadius: '8px',
border: 'none',
backgroundColor: tab === key ? '#0e5a63' : 'transparent',
color: tab === key ? '#fff' : '#0f2a3a',
fontWeight: 700,
fontSize: '14px',
cursor: 'pointer',
textAlign: 'right' as const
});

return h(
'div',
{ className: 'container-p', style: { padding: '28px 20px' } },
h('h1', { style: { fontSize: '26px', fontWeight: 800, marginBottom: '6px' } }, 'لوحة التحكم (Back Office)'),
h('p', { style: { fontSize: '13px', opacity: 0.7, marginBottom: '20px' } }, 'نموذج أولي للوحة التحكم - بيانات تجريبية للعرض فقط.'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px' } },
h(
'nav',
{ className: 'card no-print', style: { padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', height: 'fit-content' } },
tabs.map((t) => h('button', { key: t.key, style: navBtn(t.key), onClick: () => setTab(t.key) }, t.label))
),
h(
'div',
{ className: 'card', style: { padding: '22px', minHeight: '360px' } },
tab === 'overview'
? h(
'div',
{},
h('h2', { style: { fontWeight: 800, marginBottom: '14px' } }, 'نظرة عامة'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' } },
h('div', { className: 'card', style: { padding: '16px' } }, h('div', { style: { fontSize: '13px', opacity: 0.7 } }, 'الحجوزات هذا الشهر'), h('div', { style: { fontSize: '24px', fontWeight: 800 } }, '18')),
h('div', { className: 'card', style: { padding: '16px' } }, h('div', { style: { fontSize: '13px', opacity: 0.7 } }, 'إجمالي الإيرادات'), h('div', { style: { fontSize: '24px', fontWeight: 800 } }, '24,500 $')),
h('div', { className: 'card', style: { padding: '16px' } }, h('div', { style: { fontSize: '13px', opacity: 0.7 } }, 'طلبات صمم رحلتك الجديدة'), h('div', { style: { fontSize: '24px', fontWeight: 800 } }, '7'))
)
)
: null,
tab === 'packages'
? h(
'div',
{},
h('h2', { style: { fontWeight: 800, marginBottom: '14px' } }, 'إدارة الباكيجات'),
h(
'table',
{ style: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' } },
h('tbody', {}, packages.map((p) => h('tr', { key: p.slug, style: { borderBottom: '1px solid #eee' } }, h('td', { style: { padding: '10px' } }, p.title), h('td', { style: { padding: '10px', fontWeight: 700, color: '#b8862b' } }, p.priceFrom + ' $'), h('td', { style: { padding: '10px' } }, p.days + ' أيام'))))
)
)
: null,
tab === 'bookings'
? h(
'div',
{},
h('h2', { style: { fontWeight: 800, marginBottom: '14px' } }, 'إدارة الحجوزات والقسائم'),
h(
'table',
{ style: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' } },
h('tbody', {}, mockBookings.map((b) => h('tr', { key: b.id, style: { borderBottom: '1px solid #eee' } }, h('td', { style: { padding: '10px' } }, b.id), h('td', { style: { padding: '10px' } }, b.client), h('td', { style: { padding: '10px' } }, b.pkg), h('td', { style: { padding: '10px' } }, b.status), h('td', { style: { padding: '10px', fontWeight: 700 } }, b.total + ' $'))))
)
)
: null,
tab === 'quote'
? h(
'div',
{},
h('h2', { style: { fontWeight: 800, marginBottom: '14px' } }, 'مولّد عروض الأسعار'),
h(
'div',
{ className: 'no-print', style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '18px' } },
h(
'div',
{},
h('label', { style: { fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '4px' } }, 'الباقة'),
h('select', { style: { width: '100%', padding: '8px' }, value: quotePkg, onChange: (e: any) => setQuotePkg(e.target.value) }, packages.map((p) => h('option', { key: p.slug, value: p.slug }, p.title)))
),
h(
'div',
{},
h('label', { style: { fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '4px' } }, 'عدد الليالي'),
h('input', { type: 'number', style: { width: '100%', padding: '8px' }, value: nights, onChange: (e: any) => setNights(Number(e.target.value)) })
),
h(
'div',
{},
h('label', { style: { fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '4px' } }, 'عدد الأفراد'),
h('input', { type: 'number', style: { width: '100%', padding: '8px' }, value: pax, onChange: (e: any) => setPax(Number(e.target.value)) })
),
h(
'div',
{},
h('label', { style: { fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '4px' } }, 'هامش الربح %'),
h('input', { type: 'number', style: { width: '100%', padding: '8px' }, value: margin, onChange: (e: any) => setMargin(Number(e.target.value)) })
)
),
h(
'div',
{ style: { border: '1px solid #ddd', borderRadius: '10px', padding: '20px', marginBottom: '16px' } },
h('h3', { style: { fontWeight: 800, marginBottom: '10px' } }, 'معاينة عرض السعر - HBS Travel'),
h('p', {}, 'الباقة: ' + pkg.title),
h('p', {}, 'عدد الليالي: ' + nights + ' - عدد الأفراد: ' + pax),
h('p', {}, 'التكلفة الأساسية: ' + baseCost + ' $'),
h('p', { style: { fontWeight: 800, color: '#b8862b', fontSize: '18px' } }, 'السعر النهائي المقترح للعميل: ' + finalPrice + ' $')
),
h('button', { className: 'no-print btn-primary', style: { border: 'none' }, onClick: () => window.print() }, 'تنزيل / طباعة PDF بالعربي')
)
: null,
tab === 'crm'
? h(
'div',
{},
h('h2', { style: { fontWeight: 800, marginBottom: '14px' } }, 'إدارة العملاء (CRM)'),
h(
'table',
{ style: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' } },
h('tbody', {}, mockClients.map((c) => h('tr', { key: c.name, style: { borderBottom: '1px solid #eee' } }, h('td', { style: { padding: '10px' } }, c.name), h('td', { style: { padding: '10px' } }, c.source), h('td', { style: { padding: '10px' } }, c.stage), h('td', { style: { padding: '10px', fontSize: '13px', opacity: 0.75 } }, c.follow))))
)
)
: null,
tab === 'reports'
? h(
'div',
{},
h('h2', { style: { fontWeight: 800, marginBottom: '14px' } }, 'تقارير التكلفة مقابل السعر'),
h(
'table',
{ style: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' } },
h('tbody', {}, mockReports.map((r) => h('tr', { key: r.pkg, style: { borderBottom: '1px solid #eee' } }, h('td', { style: { padding: '10px' } }, r.pkg), h('td', { style: { padding: '10px' } }, 'التكلفة: ' + r.cost + ' $'), h('td', { style: { padding: '10px' } }, 'السعر: ' + r.price + ' $'), h('td', { style: { padding: '10px', fontWeight: 800, color: '#0e5a63' } }, 'الهامش: ' + r.margin + ' $'))))
)
)
: null
)
)
);
  }
