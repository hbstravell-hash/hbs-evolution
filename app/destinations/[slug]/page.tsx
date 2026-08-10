import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { destinations, packages } from '../../../lib/data';

const h = React.createElement;
export function generateStaticParams() {
    return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const dest = destinations.find((d) => d.slug === params.slug);
    if (!dest) return {};
    return {
          title: 'السياحة في ' + dest.name + ' | HBS Evolution',
          description: dest.about
    };
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
    const dest = destinations.find((d) => d.slug === params.slug);
    if (!dest) return notFound();

  const relatedPackages = packages.filter((p) => p.cities.includes(dest.name));

  return h(
        'div',
    { className: 'container-p', style: { padding: '28px 20px' } },
        h('div', { className: 'gallery-placeholder', style: { height: '220px', marginBottom: '18px' } }, dest.name),
        h('h1', { style: { fontSize: '30px', fontWeight: 800, marginBottom: '6px' } }, 'السياحة في ' + dest.name),
        h('p', { style: { fontSize: '16px', color: '#0e5a63', fontWeight: 700, marginBottom: '14px' } }, dest.tagline),
        h('p', { style: { fontSize: '15px', lineHeight: 1.9, marginBottom: '22px' } }, dest.about),
        h(
                'section',
          { style: { marginBottom: '24px' } },
                h('h2', { style: { fontSize: '20px', fontWeight: 800, marginBottom: '12px' } }, 'أبرز الأماكن'),
                h(
                          'ul',
                  { style: { paddingRight: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' } },
                          dest.highlights.map((hgl) => h('li', { key: hgl }, hgl))
                        )
              ),
        h(
                'section',
          { style: { marginBottom: '24px' } },
                h('h2', { style: { fontSize: '20px', fontWeight: 800, marginBottom: '12px' } }, 'الطقس شهرياً'),
                h(
                          'div',
                  { className: 'card', style: { overflow: 'auto' } },
                          h(
                                      'table',
                            { style: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' } },
                                      h(
                                                    'tbody',
                                        {},
                                                    dest.weather.map((w) =>
                                                                    h(
                                                                                      'tr',
                                                                      { key: w.month, style: { borderBottom: '1px solid #eee' } },
                                                                                      h('td', { style: { padding: '10px 14px', fontWeight: 700, width: '110px' } }, w.month),
                                                                                      h('td', { style: { padding: '10px 14px', opacity: 0.8 } }, w.note)
                                                                                    )
                                                                                 )
                                                  )
                                    )
                        )
              ),
        relatedPackages.length > 0
          ? h(
                      'section',
            {},
                      h('h2', { style: { fontSize: '20px', fontWeight: 800, marginBottom: '12px' } }, 'باكيجات مرتبطة بهذه الوجهة'),
                      h(
                                    'div',
                        { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' } },
                                    relatedPackages.map((p) =>
                                                    h(
                                                                      Link,
                                                      { key: p.slug, href: '/packages/' + p.slug, className: 'card', style: { padding: '16px', textDecoration: 'none', color: 'inherit' } },
                                                                      h('div', { style: { fontWeight: 700, marginBottom: '6px' } }, p.title),
                                                                      h('div', { style: { fontWeight: 800, color: '#b8862b' } }, 'من ' + p.priceFrom + ' $')
                                                                    )
                                                                    )
                                  )
                    )
          : null
      );
}
