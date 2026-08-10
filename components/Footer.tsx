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

export default function Footer() {
    return h(
          'footer',
      { style: { backgroundColor: '#0f2a3a', color: '#f6efe3', marginTop: '48px' } },
          h(
                  'div',
            { className: 'container-p', style: { paddingTop: '36px', paddingBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '28px' } },
                  h(
                            'div',
                    {},
                            h('div', { style: { fontWeight: 800, fontSize: '20px', marginBottom: '10px' } }, 'HBS Evolution'),
                            h('p', { style: { fontSize: '14px', lineHeight: 1.9, opacity: 0.85 } }, 'شريككم الموثوق لتنظيم رحلات جورجيا للعائلات والأفراد من دول الخليج، بخبرة محلية ومرشدين يتحدثون العربية.'),
                            h('p', { style: { fontSize: '13px', opacity: 0.75, marginTop: '10px' } }, 'سجل تجاري في جورجيا رقم: GE-000000'),
                            h('p', { style: { fontSize: '13px', opacity: 0.75 } }, 'المكتب الرئيسي: تبليسي، شارع روستافيلي، جورجيا')
                          ),
                  h(
                            'div',
                    {},
                            h('div', { style: { fontWeight: 700, marginBottom: '10px' } }, 'روابط مهمة'),
                            h(
                                        'ul',
                              { style: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' } },
                                        legalLinks.map((l) => h('li', { key: l.href }, h(Link, { href: l.href, style: { color: '#f6efe3', textDecoration: 'none', fontSize: '14px', opacity: 0.85 } }, l.label)))
                                      )
                          ),
                  h(
                            'div',
                    {},
                            h('div', { style: { fontWeight: 700, marginBottom: '10px' } }, 'موقع المكتب'),
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
                            h('div', { style: { fontWeight: 700, marginBottom: '10px' } }, 'تواصل معنا'),
                            h('p', { style: { fontSize: '14px', opacity: 0.85 } }, 'واتساب: 995500000000+'),
                            h('p', { style: { fontSize: '14px', opacity: 0.85 } }, 'البريد: info@hbsevolution.com'),
                            h('p', { style: { fontSize: '13px', opacity: 0.7, marginTop: '10px' } }, 'مواطنو دول الخليج يدخلون جورجيا بدون تأشيرة مسبقة.')
                          )
                ),
          h(
                  'div',
            { style: { borderTop: '1px solid rgba(246,239,227,0.15)', textAlign: 'center', padding: '16px', fontSize: '13px', opacity: 0.7 } },
                  '© ' + new Date().getFullYear() + ' HBS Evolution. جميع الحقوق محفوظة.'
                )
        );
}
