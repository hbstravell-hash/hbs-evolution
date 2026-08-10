import React from 'react';
import Link from 'next/link';
import { packages, destinations, activities } from '../lib/data';

const h = React.createElement;

const testimonials = [
  { name: 'أبو فهد', city: 'الرياض', text: 'تنظيم ممتاز من الاستقبال حتى المغادرة، والمرشد العربي سهّل علينا كل شيء مع الأطفال.' },
  { name: 'أم سارة', city: 'دبي', text: 'الفنادق كانت مناسبة تماماً للعائلة والمطاعم الحلال متوفرة في كل مدينة زرناها.' },
  { name: 'خالد العتيبي', city: 'الكويت', text: 'رحلة سفانيتي كانت تجربة لا تُنسى، وسعر واضح بدون أي مفاجآت عند الوصول.' }
  ];

const trustPoints = [
    'مرشدون يتحدثون العربية بطلاقة',
    'مطاعم حلال في جميع البرامج',
    'سائق خاص وسيارات عائلية مريحة',
    'دخول جورجيا بدون تأشيرة مسبقة لمواطني الخليج',
    'باقات مناسبة للعائلات الكبيرة والخصوصية',
    'عروض خاصة لموسم العيد والإجازات الصيفية'
  ];

export default function HomePage() {
    return h(
          'div',
      {},
          h(
                  'section',
            { style: { background: 'linear-gradient(135deg, #0e5a63, #0f2a3a)', color: '#f6efe3', padding: '64px 0' } },
                  h(
                            'div',
                    { className: 'container-p', style: { textAlign: 'center' } },
                            h('h1', { style: { fontSize: '36px', fontWeight: 800, marginBottom: '14px' } }, 'رحلتكم إلى جورجيا تبدأ من هنا'),
                            h('p', { style: { fontSize: '18px', opacity: 0.9, maxWidth: '640px', margin: '0 auto 28px' } }, 'باكيجات جاهزة ورحلات مصممة خصيصاً لعائلات وأفراد دول الخليج، بعربية أصيلة وخدمة تناسبكم من أول دقيقة.'),
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
            { className: 'container-p', style: { padding: '28px 20px', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' } },
                  trustPoints.map((t) => h('div', { key: t, className: 'card', style: { padding: '14px 18px', fontSize: '13px', fontWeight: 600 } }, t))
                ),
          h(
                  'section',
            { className: 'container-p', style: { padding: '20px' } },
                  h('h2', { style: { fontSize: '26px', fontWeight: 800, marginBottom: '18px' } }, 'باكيجات مقترحة'),
                  h(
                            'div',
                    { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' } },
                            packages.slice(0, 3).map((p) =>
                                        h(
                                                      'div',
                                          { key: p.slug, className: 'card' },
                                                      h('div', { className: 'gallery-placeholder', style: { height: '160px' } }, p.cities.join(' - ')),
                                                      h(
                                                                      'div',
                                                        { style: { padding: '16px' } },
                                                                      h('h3', { style: { fontSize: '17px', fontWeight: 700, marginBottom: '6px' } }, p.title),
                                                                      h('p', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '10px' } }, p.days + ' أيام / ' + p.nights + ' ليالٍ'),
                                                                      h('p', { style: { fontWeight: 800, color: '#b8862b', marginBottom: '12px' } }, 'يبدأ من ' + p.priceFrom + ' $ للفرد'),
                                                                      h(Link, { href: '/packages/' + p.slug, className: 'btn-primary', style: { display: 'block', textAlign: 'center' } }, 'التفاصيل والحجز')
                                                                    )
                                                    )
                                                             )
                          )
                ),
          h(
                  'section',
            { className: 'container-p', style: { padding: '20px' } },
                  h('h2', { style: { fontSize: '26px', fontWeight: 800, marginBottom: '18px' } }, 'الوجهات السياحية'),
                  h(
                            'div',
                    { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' } },
                            destinations.map((d) =>
                                        h(
                                                      Link,
                                          { key: d.slug, href: '/destinations/' + d.slug, className: 'card', style: { textDecoration: 'none', color: 'inherit' } },
                                                      h('div', { className: 'gallery-placeholder', style: { height: '110px' } }, d.name),
                                                      h('div', { style: { padding: '12px' } }, h('div', { style: { fontWeight: 700 } }, d.name), h('div', { style: { fontSize: '12px', opacity: 0.7 } }, d.tagline))
                                                    )
                                                     )
                          )
                ),
          h(
                  'section',
            { style: { background: '#0e5a63', color: '#f6efe3', padding: '36px 0', margin: '24px 0' } },
                  h(
                            'div',
                    { className: 'container-p', style: { textAlign: 'center' } },
                            h('h2', { style: { fontSize: '24px', fontWeight: 800, marginBottom: '10px' } }, 'لم تجد ما يناسبك بالضبط؟'),
                            h('p', { style: { marginBottom: '18px' } }, 'صمم رحلتك الخاصة بخطوات بسيطة وسنتواصل معك خلال ساعات عبر واتساب.'),
                            h(Link, { href: '/custom-trip', className: 'btn-primary' }, 'ابدأ الآن')
                          )
                ),
          h(
                  'section',
            { className: 'container-p', style: { padding: '20px' } },
                  h('h2', { style: { fontSize: '26px', fontWeight: 800, marginBottom: '18px' } }, 'أنشطة وجولات يومية'),
                  h(
                            'div',
                    { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' } },
                            activities.slice(0, 3).map((a) =>
                                        h(
                                                      'div',
                                          { key: a.slug, className: 'card', style: { padding: '16px' } },
                                                      h('div', { style: { fontWeight: 700, marginBottom: '6px' } }, a.title),
                                                      h('div', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '6px' } }, a.duration + ' - ' + a.city),
                                                      h('div', { style: { fontWeight: 800, color: '#b8862b' } }, a.pricePerPerson + ' $ للفرد')
                                                    )
                                                               )
                          ),
                  h(Link, { href: '/activities', style: { display: 'inline-block', marginTop: '14px', fontWeight: 700, color: '#0e5a63' } }, 'عرض جميع الأنشطة ←')
                ),
          h(
                  'section',
            { className: 'container-p', style: { padding: '20px' } },
                  h('h2', { style: { fontSize: '26px', fontWeight: 800, marginBottom: '18px' } }, 'آراء عملائنا'),
                  h(
                            'div',
                    { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' } },
                            testimonials.map((t) =>
                                        h(
                                                      'div',
                                          { key: t.name, className: 'card', style: { padding: '18px' } },
                                                      h('p', { style: { fontSize: '14px', marginBottom: '10px' } }, '"' + t.text + '"'),
                                                      h('div', { style: { fontWeight: 700 } }, t.name),
                                                      h('div', { style: { fontSize: '12px', opacity: 0.7 } }, t.city)
                                                    )
                                                     )
                          ),
                  h(
                            'div',
                    { style: { display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap' } },
                            h('div', { className: 'card', style: { padding: '16px', fontWeight: 700 } }, '4.9 / 5 على Google (مساحة مخصصة لتضمين التقييمات الحقيقية)'),
                            h('div', { className: 'card', style: { padding: '16px', fontWeight: 700 } }, '4.8 / 5 على TripAdvisor (مساحة مخصصة لتضمين التقييمات الحقيقية)')
                          )
                )
        );
}
