import React from 'react';
import type { Metadata } from 'next';

const h = React.createElement;
export const metadata: Metadata = {
    title: 'المدونة | HBS Evolution',
    description: 'مقالات ونصائح سفر عن السياحة في جورجيا لعائلات وأفراد دول الخليج.'
};
const posts = [
  { title: 'دليلك الشامل للسياحة في باتومي', excerpt: 'أفضل الأماكن والأنشطة على شواطئ البحر الأسود لعائلتك.' },
  { title: 'أفضل وقت لزيارة كازبيجي وطريق جورجيا العسكري', excerpt: 'كل ما تحتاج معرفته قبل رحلتك إلى الجبال.' },
  { title: 'خمس تجارب لا تفوتها في تبليسي القديمة', excerpt: 'من الحمامات الكبريتية إلى تلفريك ناريقالا.' },
  { title: 'السفر إلى جورجيا مع الأطفال: نصائح عملية', excerpt: 'كيف تخطط لرحلة عائلية مريحة وممتعة للصغار والكبار.' },
  { title: 'موسم الثلوج في باكورياني وبورجومي', excerpt: 'أفضل الأنشطة الشتوية المناسبة للعائلات الخليجية.' },
  { title: 'كل ما تحتاج معرفته عن الدخول إلى جورجيا لمواطني الخليج', excerpt: 'شروط الدخول والإقامة وأهم النصائح قبل السفر.' }
  ];
export default function BlogPage() {
    return h(
          'div',
      { className: 'container-p', style: { padding: '32px 20px' } },
          h('h1', { style: { fontSize: '28px', fontWeight: 800, marginBottom: '18px' } }, 'المدونة'),
          h(
                  'div',
            { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' } },
                  posts.map((p) =>
                            h(
                                        'div',
                              { key: p.title, className: 'card' },
                                        h('div', { className: 'gallery-placeholder', style: { height: '130px' } }, 'صورة المقال'),
                                        h(
                                                      'div',
                                          { style: { padding: '14px' } },
                                                      h('h2', { style: { fontSize: '16px', fontWeight: 700, marginBottom: '6px' } }, p.title),
                                                      h('p', { style: { fontSize: '13px', opacity: 0.75 } }, p.excerpt)
                                                    )
                                      )
                                  )
                )
        );
}
