import React from 'react';
import Link from 'next/link';
import { packages, destinations, activities } from '../lib/data';

const h = React.createElement;

const trustPoints = [
'مرشدون يتحدثون العربية بطلاقة',
'مطاعم حلال في جميع البرامج',
'سائق خاص وسيارات عائلية مريحة',
'دخول جورجيا بدون تأشيرة مسبقة لمواطني الخليج',
'باقات مناسبة للعائلات الكبيرة والخصوصية',
'عروض خاصة لموسم العيد والإجازات الصيفية'
];

const heroImage = 'https://images.unsplash.com/photo-1563284223-333497472e88?auto=format&fit=crop&w=1600&q=80';

export default function HomePage() {
return h(
'div',
{},
h(
'section',
{ style: { background: 'linear-gradient(135deg, rgba(14,90,99,0.9), rgba(15,42,58,0.94)), url(' + heroImage + ')', backgroundSize: 'cover', backgroundPosition: 'center', color: '#f6efe3', padding: '84px 0 76px' } },
h(
'div',
{ className: 'container-p', style: { textAlign: 'center' } },
h('span', { className: 'kicker' }, 'HBS Travel · جورجيا'),
h('h1', { style: { fontSize: '40px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.3 } }, 'رحلتكم إلى جورجيا تبدأ من هنا'),
h('p', { style: { fontSize: '18px', opacity: 0.92, maxWidth: '640px', margin: '0 auto 32px' } }, 'باكيجات جاهزة ورحلات مصممة خصيصاً لعائلات وأفراد دول الخليج، بعربية أصيلة وخدمة تناسبكم من أول دقيقة.'),
h(
'div',
{ style: { display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' } },
h(Link, { href: '/packages', className: 'btn-primary' }, 'تصفح الباكيجات'),
h(Link, { href: '/custom-trip', className: 'btn-whatsapp' }, 'صمم رحلتك الخاصة')
)
)
),
h(
'section',
{ className: 'container-p', style: { padding: '32px 20px', display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' } },
trustPoints.map((t) => h('div', { key: t, className: 'badge-pill' }, h('span', { className: 'tick' }, '✓'), t))
),
h(
'section',
{ className: 'container-p', style: { padding: '20px' } },
h('h2', { className: 'section-title' }, 'باكيجات مقترحة'),
h('p', { className: 'section-sub' }, 'اختيارات جاهزة من أفضل مسارات جورجيا، بأسعار واضحة وشاملة.'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '22px', marginTop: '16px' } },
packages.slice(0, 3).map((p) =>
h(
'div',
{ key: p.slug, className: 'card' },
h(
'div',
{ style: { position: 'relative' } },
h('img', { src: p.image, alt: p.title, style: { height: '170px', width: '100%', objectFit: 'cover', display: 'block' } }),
h('span', { style: { position: 'absolute', top: '12px', insetInlineStart: '12px', background: 'rgba(15,42,58,0.85)', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px' } }, p.days + ' أيام / ' + p.nights + ' ليالٍ')
),
h(
'div',
{ style: { padding: '18px' } },
h('h3', { style: { fontSize: '17px', fontWeight: 700, marginBottom: '10px' } }, p.title),
h('p', { style: { fontWeight: 800, color: '#b8862b', marginBottom: '14px', fontSize: '15px' } }, 'يبدأ من ' + p.priceFrom + ' $ للفرد'),
h(Link, { href: '/packages/' + p.slug, className: 'btn-primary', style: { display: 'block', textAlign: 'center' } }, 'التفاصيل والحجز')
)
)
)
)
),
h(
'section',
{ className: 'container-p', style: { padding: '20px' } },
h('h2', { className: 'section-title' }, 'الوجهات السياحية'),
h('p', { className: 'section-sub' }, 'تعرفوا على أجمل مدن ومناطق جورجيا التي يمكنكم زيارتها.'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginTop: '16px' } },
destinations.map((d) =>
h(
Link,
{ key: d.slug, href: '/destinations/' + d.slug, className: 'overlay-card' },
h('img', { src: d.image, alt: d.name, style: { height: '220px', width: '100%', objectFit: 'cover' } }),
h(
'div',
{ className: 'overlay-caption' },
h('div', { style: { fontWeight: 800, fontSize: '17px', marginBottom: '4px' } }, d.name),
h('div', { style: { fontSize: '13px', opacity: 0.9 } }, d.tagline)
)
)
)
)
),
h(
'section',
{ style: { background: 'radial-gradient(circle at 25% 20%, rgba(255,255,255,0.1), transparent 55%), #0e5a63', color: '#f6efe3', padding: '44px 0', margin: '32px 0' } },
h(
'div',
{ className: 'container-p', style: { textAlign: 'center' } },
h('h2', { style: { fontSize: '24px', fontWeight: 800, marginBottom: '10px' } }, 'لم تجد ما يناسبك بالضبط؟'),
h('p', { style: { marginBottom: '22px', opacity: 0.92 } }, 'صمم رحلتك الخاصة بخطوات بسيطة وسنتواصل معك خلال ساعات عبر واتساب.'),
h(Link, { href: '/custom-trip', className: 'btn-primary' }, 'ابدأ الآن')
)
),
h(
'section',
{ className: 'container-p', style: { padding: '20px' } },
h('h2', { className: 'section-title' }, 'أنشطة وجولات يومية'),
h('p', { className: 'section-sub' }, 'جولات يومية يمكن إضافتها إلى برنامج رحلتكم.'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginTop: '16px' } },
activities.slice(0, 3).map((a) =>
h(
'div',
{ key: a.slug, className: 'card', style: { padding: '18px' } },
h('div', { style: { fontWeight: 700, marginBottom: '8px' } }, a.title),
h('div', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '8px' } }, a.duration + ' - ' + a.city),
h('div', { style: { fontWeight: 800, color: '#b8862b' } }, a.pricePerPerson + ' $ للفرد')
)
)
),
h(Link, { href: '/activities', style: { display: 'inline-block', marginTop: '18px', fontWeight: 700, color: '#0e5a63' } }, 'عرض جميع الأنشطة ←')
),
h(
'section',
{ className: 'container-p', style: { padding: '20px 20px 48px' } },
h('h2', { className: 'section-title' }, 'آراء عملائنا'),
h('p', { className: 'section-sub' }, 'نعمل حالياً على جمع تقييمات حقيقية من عملائنا، وستُنشر هنا فور توفرها.'),
h(
'div',
{
className: 'card',
style: {
padding: '46px 24px',
textAlign: 'center',
border: '2px dashed rgba(184,134,43,0.4)',
backgroundColor: 'rgba(217,164,65,0.06)',
boxShadow: 'none',
marginTop: '16px'
}
},
h('div', { style: { fontSize: '32px', marginBottom: '10px' } }, '⭐'),
h('div', { style: { fontWeight: 800, fontSize: '17px', marginBottom: '8px', color: '#0f2a3a' } }, 'قريباً: تقييمات حقيقية من عملائنا'),
h(
'p',
{ style: { fontSize: '14px', opacity: 0.75, maxWidth: '480px', margin: '0 auto' } },
'هذه المساحة محجوزة لعرض تقييمات عملائنا الحقيقية على Google وTripAdvisor، وسيتم تفعيلها بعد بدء استلام أول التقييمات.'
)
)
)
);
}
