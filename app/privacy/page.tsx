import React from 'react';
import type { Metadata } from 'next';

const h = React.createElement;
export const metadata: Metadata = {
title: 'سياسة الخصوصية | HBS Travel',
description: 'كيف تتعامل HBS Travel مع بيانات عملائها الشخصية.'
};
const sections = [
{ title: 'البيانات التي نجمعها', text: 'نجمع الاسم ورقم التواصل والبريد الإلكتروني وتفاصيل الرحلة المطلوبة فقط عند تعبئة نماذج الحجز أو صمم رحلتك.' },
{ title: 'استخدام البيانات', text: 'تُستخدم بياناتكم فقط لتجهيز عروض الأسعار والحجوزات والتواصل معكم بخصوص رحلتكم، ولا تُستخدم لأي غرض آخر.' },
{ title: 'حماية البيانات', text: 'لا نقوم بتخزين أي بيانات بطاقات ائتمانية على مواقعنا، وجميع البيانات الشخصية محفوظة بإجراءات حماية مناسبة.' },
{ title: 'مشاركة البيانات', text: 'لا تتم مشاركة بياناتكم مع أي طرف ثالث إلا في حدود ما يلزم لتنفيذ الحجز مثل الفنادق أو شركات النقل المتعاقد معها.' },
{ title: 'حقوق العميل', text: 'يحق لكم طلب الاطلاع على بياناتكم أو تعديلها أو حذفها بالتواصل معنا مباشرة عبر واتساب أو البريد الإلكتروني.' }
];
export default function PrivacyPage() {
return h(
'div',
{ className: 'container-p', style: { padding: '32px 20px', maxWidth: '820px' } },
h('h1', { style: { fontSize: '28px', fontWeight: 800, marginBottom: '18px' } }, 'سياسة الخصوصية'),
sections.map((s) =>
h(
'div',
{ key: s.title, style: { marginBottom: '20px' } },
h('h2', { style: { fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: '#0e5a63' } }, s.title),
h('p', { style: { fontSize: '14px', lineHeight: 1.9 } }, s.text)
)
)
);
}
