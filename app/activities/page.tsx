import React from 'react';
import type { Metadata } from 'next';
import { activities } from '../../lib/data';

const h = React.createElement;

export const metadata: Metadata = {
    title: 'الأنشطة والجولات اليومية في جورجيا | HBS Evolution',
    description: 'جولات يومية مستقلة قابلة للحجز في جورجيا مع مرشدين يتحدثون العربية.'
};
export default function ActivitiesPage() {
    return h(
          'div',
      { className: 'container-p', style: { padding: '32px 20px' } },
          h('h1', { style: { fontSize: '30px', fontWeight: 800, marginBottom: '8px' } }, 'الأنشطة والجولات اليومية'),
          h('p', { style: { opacity: 0.75, marginBottom: '24px' } }, 'جولات مستقلة قابلة للحجز بدون الحاجة لباقة كاملة، مثالية لإضافتها إلى برنامجكم الخاص.'),
          h(
                  'div',
            { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' } },
                  activities.map((a) =>
                            h(
                                        'div',
                              { key: a.slug, className: 'card', style: { padding: '18px' } },
                                        h('h2', { style: { fontSize: '17px', fontWeight: 700, marginBottom: '8px' } }, a.title),
                                        h('p', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '4px' } }, 'المدينة: ' + a.city),
                                        h('p', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '4px' } }, 'المدة: ' + a.duration),
                                        h('p', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '4px' } }, 'نقطة الانطلاق: ' + a.meetingPoint),
                                        h('p', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '10px' } }, a.arabicGuide ? 'يتوفر مرشد يتحدث العربية' : ''),
                                        h(
                                                      'ul',
                                          { style: { paddingRight: '18px', margin: '0 0 12px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px' } },
                                                      a.includes.map((it) => h('li', { key: it }, it))
                                                    ),
                                        h('div', { style: { fontWeight: 800, color: '#b8862b', fontSize: '16px' } }, a.pricePerPerson + ' $ للفرد')
                                      )
                                       )
                )
        );
}
