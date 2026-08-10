'use client';
import React, { useState } from 'react';

const h = React.createElement;
const cityOptions = [
'تبليسي',
'باتومي',
'كازبيجي',
'بورجومي',
'كاخيتي',
'باكورياني',
'سفانيتي'
];
const interestOptions = [
'طبيعة وجبال',
'شواطئ واسترخاء',
'تسوق ومدن',
'مغامرات وأنشطة',
'تاريخ وثقافة',
'عائلات وأطفال'
];
const hotelLevels = [
'3 نجوم اقتصادي',
'4 نجوم مريح',
'5 نجوم فاخر'
];
export default function CustomTripPage() {
const [dates, setDates] = useState('');
const [adults, setAdults] = useState('2');
const [children, setChildren] = useState('0');
const [childrenAges, setChildrenAges] = useState('');
const [hotelLevel, setHotelLevel] = useState(hotelLevels[1]);
const [budget, setBudget] = useState('');
const [cities, setCities] = useState<string[]>([]);
const [interests, setInterests] = useState<string[]>([]);
const [name, setName] = useState('');
const [phone, setPhone] = useState('');

const toggleValue = (arr: string[], setArr: (v: string[]) => void, value: string) => {
if (arr.includes(value)) {
setArr(arr.filter((v) => v !== value));
} else {
setArr([...arr, value]);
}
};

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
const lines = [
'مرحباً، أرغب بتصميم رحلة خاصة إلى جورجيا:',
'الاسم: ' + name,
'رقم التواصل: ' + phone,
'التواريخ التقريبية: ' + dates,
'عدد البالغين: ' + adults + ' - عدد الأطفال: ' + children,
'أعمار الأطفال: ' + childrenAges,
'مستوى الفنادق: ' + hotelLevel,
'الميزانية التقريبية: ' + budget,
'المدن المرغوبة: ' + cities.join('، '),
'الاهتمامات: ' + interests.join('، ')
];
const message = encodeURIComponent(lines.join('\n'));
window.open('https://wa.me/995555165926?text=' + message, '_blank');
};

const labelStyle = { fontWeight: 700, fontSize: '14px', marginBottom: '6px', display: 'block' };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', marginBottom: '16px' };
const chipStyle = (active: boolean) => ({
padding: '8px 14px',
borderRadius: '9999px',
border: '1px solid #0e5a63',
backgroundColor: active ? '#0e5a63' : 'transparent',
color: active ? '#fff' : '#0e5a63',
fontSize: '13px',
cursor: 'pointer'
});

return h(
'div',
{ className: 'container-p', style: { padding: '32px 20px', maxWidth: '760px' } },
h('h1', { style: { fontSize: '28px', fontWeight: 800, marginBottom: '8px' } }, 'صمّم رحلتك الخاصة'),
h('p', { style: { opacity: 0.75, marginBottom: '24px' } }, 'أخبرنا بتفاصيل رحلتكم المفضلة وسنرسل لكم عرض سعر مخصص عبر واتساب خلال ساعات.'),
h(
'form',
{ onSubmit: handleSubmit, className: 'card', style: { padding: '24px' } },
h('label', { style: labelStyle }, 'الاسم الكامل'),
h('input', { style: inputStyle, value: name, onChange: (e: any) => setName(e.target.value), required: true }),
h('label', { style: labelStyle }, 'رقم التواصل (واتساب)'),
h('input', { style: inputStyle, value: phone, onChange: (e: any) => setPhone(e.target.value), required: true, placeholder: '+966...' }),
h('label', { style: labelStyle }, 'التواريخ التقريبية للرحلة'),
h('input', { style: inputStyle, value: dates, onChange: (e: any) => setDates(e.target.value), placeholder: 'مثال: منتصف يوليو لمدة أسبوع' }),
h(
'div',
{ style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } },
h(
'div',
{},
h('label', { style: labelStyle }, 'عدد البالغين'),
h('input', { type: 'number', min: 1, style: inputStyle, value: adults, onChange: (e: any) => setAdults(e.target.value) })
),
h(
'div',
{},
h('label', { style: labelStyle }, 'عدد الأطفال'),
h('input', { type: 'number', min: 0, style: inputStyle, value: children, onChange: (e: any) => setChildren(e.target.value) })
)
),
h('label', { style: labelStyle }, 'أعمار الأطفال (إن وجد)'),
h('input', { style: inputStyle, value: childrenAges, onChange: (e: any) => setChildrenAges(e.target.value), placeholder: 'مثال: 4 و 9 سنوات' }),
h('label', { style: labelStyle }, 'مستوى الفنادق المرغوب'),
h(
'select',
{ style: inputStyle, value: hotelLevel, onChange: (e: any) => setHotelLevel(e.target.value) },
hotelLevels.map((lv) => h('option', { key: lv, value: lv }, lv))
),
h('label', { style: labelStyle }, 'الميزانية التقريبية (بالدولار للفرد)'),
h('input', { style: inputStyle, value: budget, onChange: (e: any) => setBudget(e.target.value), placeholder: 'مثال: 500-700' }),
h('label', { style: labelStyle }, 'المدن المرغوبة'),
h(
'div',
{ style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' } },
cityOptions.map((c) =>
h(
'button',
{ key: c, type: 'button', style: chipStyle(cities.includes(c)), onClick: () => toggleValue(cities, setCities, c) },
c
)
)
),
h('label', { style: labelStyle }, 'الاهتمامات'),
h(
'div',
{ style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' } },
interestOptions.map((it) =>
h(
'button',
{ key: it, type: 'button', style: chipStyle(interests.includes(it)), onClick: () => toggleValue(interests, setInterests, it) },
it
)
)
),
h('button', { type: 'submit', className: 'btn-whatsapp', style: { width: '100%', border: 'none', fontSize: '16px' } }, 'إرسال الطلب عبر واتساب')
)
);
 }
