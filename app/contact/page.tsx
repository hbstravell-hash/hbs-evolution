import React from 'react';
import type { Metadata } from 'next';

const h = React.createElement;
export const metadata: Metadata = {
title: 'اتصل بنا | HBS Travel',
description: 'تواصلوا مع فريق HBS Travel لتنظيم رحلتكم إلى جورجيا.'
};
export default function ContactPage() {
return h(
'div',
{ className: 'container-p', style: { padding: '32px 20px', maxWidth: '760px' } },
h('h1', { style: { fontSize: '28px', fontWeight: 800, marginBottom: '14px' } }, 'اتصل بنا'),
h('p', { style: { fontSize: '15px', lineHeight: 1.9, marginBottom: '26px' } }, 'يسعدنا تواصلكم معنا في أي وقت، فريقنا متاح للرد على استفساراتكم وتجهيز عرض السعر المناسب لرحلتكم.'),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '26px' } },
h('div', { className: 'card', style: { padding: '18px' } }, h('div', { style: { fontWeight: 800, marginBottom: '6px' } }, 'واتساب'), h('div', {}, '995555165926+')),
h('div', { className: 'card', style: { padding: '18px' } }, h('div', { style: { fontWeight: 800, marginBottom: '6px' } }, 'البريد الإلكتروني'), h('div', {}, 'info@hbstravel.ge')),
h('div', { className: 'card', style: { padding: '18px' } }, h('div', { style: { fontWeight: 800, marginBottom: '6px' } }, 'المكتب'), h('div', {}, 'شارع نينو وإيليا ناكاشيدزه، رقم 1، شقة 3، مبنى 3، تبليسي، جورجيا')),
h('div', { className: 'card', style: { padding: '18px' } }, h('div', { style: { fontWeight: 800, marginBottom: '6px' } }, 'رقم التسجيل الضريبي'), h('div', {}, '404786656'))
),
h('div', { className: 'gallery-placeholder', style: { height: '220px' } }, 'خريطة موقع مكتب تبليسي')
);
}
