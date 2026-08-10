import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { packages } from '../../lib/data';

const h = React.createElement;

export const metadata: Metadata = {
    title: 'باكيجات رحلات جورجيا | HBS Evolution',
    description: 'تصفح جميع باكيجات رحلات جورجيا الجاهزة مع الأسعار والبرامج التفصيلية المناسبة للعائلات والأفراد من دول الخليج.'
};

export default function PackagesPage() {
    return h(
          'div',
      { className: 'container-p', style: { padding: '32px 20px' } },
          h('h1', { style: { fontSize: '30px', fontWeight: 800, marginBottom: '8px' } }, 'باكيجات رحلات جورجيا'),
          h('p', { style: { opacity: 0.75, marginBottom: '24px' } }, 'باقات جاهزة وشاملة، أو يمكنكم تصميم رحلتكم الخاصة عبر نموذج صمم رحلتك.'),
          h(
                  'div',
            { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px' } },
                  packages.map((p) =>
                            h(
                                        'div',
                              { key: p.slug, className: 'card' },
                                        h('div', { className: 'gallery-placeholder', style: { height: '170px' } }, p.cities.join(' - ')),
                                        h(
                                                      'div',
                                          { style: { padding: '16px' } },
                                                      h('h2', { style: { fontSize: '18px', fontWeight: 700, marginBottom: '6px' } }, p.title),
                                                      h('p', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '6px' } }, p.days + ' أيام / ' + p.nights + ' ليالٍ'),
                                                      h('p', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '10px' } }, 'أفضل موسم: ' + p.bestSeason),
                                                      h('p', { style: { fontWeight: 800, color: '#b8862b', marginBottom: '12px' } }, 'يبدأ من ' + p.priceFrom + ' $ للفرد'),
                                                      h(Link, { href: '/packages/' + p.slug, className: 'btn-primary', style: { display: 'block', textAlign: 'center' } }, 'التفاصيل والحجز')
                                                    )
                                      )
                                     )
                )
        );
}
