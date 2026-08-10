import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { destinations } from '../../lib/data';

const h = React.createElement;

export const metadata: Metadata = {
    title: 'وجهات السياحة في جورجيا | HBS Evolution',
    description: 'تعرف على أبرز وجهات السياحة في جورجيا.'
};
export default function DestinationsPage() {
    return h(
          'div',
      { className: 'container-p', style: { padding: '32px 20px' } },
          h('h1', { style: { fontSize: '30px', fontWeight: 800, marginBottom: '8px' } }, 'وجهات السياحة في جورجيا'),
          h('p', { style: { opacity: 0.75, marginBottom: '24px' } }, 'من عاصمة صاخبة إلى قرى جبلية هادئة، اكتشف أجمل وجهات جورجيا.'),
          h(
                  'div',
            { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' } },
                  destinations.map((d) =>
                            h(
                                        Link,
                              { key: d.slug, href: '/destinations/' + d.slug, className: 'card', style: { textDecoration: 'none', color: 'inherit' } },
                                        h('div', { className: 'gallery-placeholder', style: { height: '150px' } }, d.name),
                                        h(
                                                      'div',
                                          { style: { padding: '14px' } },
                                                      h('h2', { style: { fontSize: '18px', fontWeight: 700, marginBottom: '4px' } }, d.name),
                                                      h('p', { style: { fontSize: '13px', opacity: 0.75 } }, d.tagline)
                                                    )
                                      )
                                         )
                )
        );
}
