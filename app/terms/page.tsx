import React from 'react';
import type { Metadata } from 'next';

const h = React.createElement;
export const metadata: Metadata = {
    title: 'الشروط والأحكام | HBS Evolution',
    description: 'الشروط والأحكام الخاصة بحجز رحلات HBS Evolution إلى جورجيا.'
};
const sections = [
  { title: 'التعريفات', text: 'يقصد بكلمة الشركة في هذه الوثيقة HBS Evolution، ويقصد بكلمة العميل أي شخص يقوم بحجز أي خدمة من خدمات الشركة.' },
  { title: 'الحجز والدفع', text: 'يتم تأكيد الحجز بعد دفع العربون المتفق عليه (20-30% من قيمة الرحلة)، ويُدفع باقي المبلغ عند الوصول إلى جورجيا ما لم يُتفق على خلاف ذلك.' },
  { title: 'مسؤولية العميل', text: 'يلتزم العميل بتقديم بيانات صحيحة عن عدد أفراد المجموعة وأعمار الأطفال، وأي معلومات صحية أو غذائية قد تؤثر على سير الرحلة.' },
  { title: 'التعديلات على البرنامج', text: 'تحتفظ الشركة بحق تعديل ترتيب الأنشطة داخل البرنامج لأسباب خارجة عن إرادتها كالطقس أو الظروف الأمنية، مع الحفاظ على جودة التجربة الإجمالية.' },
  { title: 'حدود المسؤولية', text: 'لا تتحمل الشركة مسؤولية التأخير الناتج عن شركات الطيران أو الجهات الحكومية أو الظروف الجوية القاهرة.' }
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
                           )
        );
}
