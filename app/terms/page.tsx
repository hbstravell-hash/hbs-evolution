import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

const h = React.createElement;
export const metadata: Metadata = {
title: 'الشروط والأحكام | HBS Travel',
description: 'الشروط والأحكام الخاصة بحجز رحلات HBS Travel إلى جورجيا.'
};
const sections = [
{ title: 'التعريفات', text: 'يقصد بكلمة الشركة في هذه الوثيقة HBS Travel LLC، ويقصد بكلمة العميل أي شخص يقوم بحجز أي خدمة من خدمات الشركة.' },
{ title: 'الحجز والدفع', text: 'يتم تأكيد الحجز فور سداد كامل قيمة الرحلة دفعة واحدة عبر أحد وسائل الدفع الآمنة المتاحة (PayPal، بطاقة ائتمان/خصم عبر PayPal، أو العملات المشفرة BTC/ETH/USDT) — لا يوجد نظام دفعة مقدمة (عربون) أو دفعة مؤجلة على أي باقة. شروط الإلغاء ونسب الاسترداد مفصّلة بالكامل في سياسة الإلغاء والاسترجاع.' },
{ title: 'مسؤولية العميل', text: 'يلتزم العميل بتقديم بيانات صحيحة عن عدد أفراد المجموعة وأعمار الأطفال، وأي معلومات صحية أو غذائية قد تؤثر على سير الرحلة.' },
{ title: 'التعديلات على البرنامج', text: 'تحتفظ الشركة بحق تعديل ترتيب الأنشطة داخل البرنامج لأسباب خارجة عن إرادتها كالطقس أو الظروف الأمنية، مع الحفاظ على جودة التجربة الإجمالية.' },
{ title: 'حدود المسؤولية', text: 'لا تتحمل الشركة مسؤولية التأخير الناتج عن شركات الطيران أو الجهات الحكومية أو الظروف الجوية القاهرة.' },
{ title: 'القانون الحاكم وحماية المستهلك', text: 'يخضع تقديم الخدمات لأنظمة جمهورية جورجيا حيث يقع مقر الشركة. تسعى الشركة إلى مراعاة المبادئ العامة لحماية المستهلك المعتمدة عادة في دول مجلس التعاون الخليجي، من إفصاح واضح عن الأسعار والشروط قبل الدفع، ووضوح آلية الإلغاء والاسترداد، وتوفير قناة تواصل رسمية لتقديم الاستفسارات والشكاوى عبر البريد الإلكتروني أو واتساب.' }
];
export default function TermsPage() {
return h(
'div',
{ className: 'container-p', style: { padding: '32px 20px', maxWidth: '820px' } },
h('h1', { style: { fontSize: '28px', fontWeight: 800, marginBottom: '18px' } }, 'الشروط والأحكام'),
sections.map((s) =>
h(
'div',
{ key: s.title, style: { marginBottom: '20px' } },
h('h2', { style: { fontSize: '18px', fontWeight: 800, marginBottom: '8px', color: '#0e5a63' } }, s.title),
h('p', { style: { fontSize: '14px', lineHeight: 1.9 } }, s.text)
)
),
h(
'p',
{ style: { fontSize: '13px', lineHeight: 1.9, opacity: 0.8 } },
'للتفاصيل الكاملة حول نسب الاسترداد ومواعيد المعالجة، يرجى مراجعة ',
h(Link, { href: '/cancellation-policy', style: { color: '#0e5a63', fontWeight: 700, textDecoration: 'underline' } }, 'سياسة الإلغاء والاسترجاع'),
'.'
)
);
}
