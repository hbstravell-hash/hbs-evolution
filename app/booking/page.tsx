'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { packages } from '../../lib/data';

const h = React.createElement;
const addonsList = [
  { key: 'airport', label: 'استقبال من المطار', price: 25 },
  { key: 'guide', label: 'مرشد خاص إضافي', price: 60 },
  { key: 'driver', label: 'سائق خاص طوال اليوم', price: 80 }
  ];
function BookingForm() {
    const searchParams = useSearchParams();
    const preselected = searchParams.get('package') || '';

  const [pkgSlug, setPkgSlug] = useState(preselected);
    const [checkIn, setCheckIn] = useState('');
    const [adults, setAdults] = useState(2);
    const [kids, setKids] = useState(0);
    const [infants, setInfants] = useState(0);
    const [roomType, setRoomType] = useState('double');
    const [addons, setAddons] = useState<string[]>([]);
    const [depositOption, setDepositOption] = useState('20');

  const pkg = packages.find((p) => p.slug === pkgSlug);
    const basePrice = pkg ? pkg.priceFrom : 0;
    const addonsTotal = addons.reduce((sum, key) => {
          const found = addonsList.find((a) => a.key === key);
          return sum + (found ? found.price : 0);
    }, 0);
    const roomExtra = roomType === 'single' && pkg ? pkg.singleSupplement : 0;
    const childTotal = pkg ? pkg.childPrice * kids : 0;
    const total = basePrice * adults + childTotal + addonsTotal + roomExtra;
    const depositAmount = Math.round((total * Number(depositOption)) / 100);

  const toggleAddon = (key: string) => {
        setAddons((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const handleConfirm = () => {
        const lines = [
                'مرحباً، أرغب بتأكيد حجز:',
                'الباقة: ' + (pkg ? pkg.title : 'غير محددة'),
                'تاريخ الوصول التقريبي: ' + checkIn,
                'عدد البالغين: ' + adults + ' - الأطفال: ' + kids + ' - الرضع: ' + infants,
                'نوع الغرفة: ' + roomType,
                'الإضافات: ' + (addons.length ? addons.join('، ') : 'بدون'),
                'الإجمالي التقديري: ' + total + ' $',
                'نسبة العربون المطلوبة: ' + depositOption + '% (' + depositAmount + ' $) والباقي يُدفع عند الوصول'
              ];
        const message = encodeURIComponent(lines.join('\n'));
        window.open('https://wa.me/995500000000?text=' + message, '_blank');
  };

  const boxStyle = { padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', width: '100%' };

  return h(
        'div',
    { style: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' } },
        h(
                'div',
          { className: 'card', style: { padding: '22px' } },
                h('label', { style: { fontWeight: 700, display: 'block', marginBottom: '6px' } }, 'اختر الباقة'),
                h(
                          'select',
                  { style: { ...boxStyle, marginBottom: '16px' }, value: pkgSlug, onChange: (e: any) => setPkgSlug(e.target.value) },
                          h('option', { value: '' }, 'اختر باقة'),
                          packages.map((p) => h('option', { key: p.slug, value: p.slug }, p.title))
                        ),
                h('label', { style: { fontWeight: 700, display: 'block', marginBottom: '6px' } }, 'تاريخ الوصول (تقويم التوفر)'),
                h('input', { type: 'date', style: { ...boxStyle, marginBottom: '16px' }, value: checkIn, onChange: (e: any) => setCheckIn(e.target.value) }),
                h(
                          'div',
                  { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' } },
                          h(
                                      'div',
                            {},
                                      h('label', { style: { fontSize: '13px', fontWeight: 700 } }, 'بالغ'),
                                      h('input', { type: 'number', min: 1, style: boxStyle, value: adults, onChange: (e: any) => setAdults(Number(e.target.value)) })
                                    ),
                          h(
                                      'div',
                            {},
                                      h('label', { style: { fontSize: '13px', fontWeight: 700 } }, 'طفل'),
                                      h('input', { type: 'number', min: 0, style: boxStyle, value: kids, onChange: (e: any) => setKids(Number(e.target.value)) })
                                    ),
                          h(
                                      'div',
                            {},
                                      h('label', { style: { fontSize: '13px', fontWeight: 700 } }, 'رضيع'),
                                      h('input', { type: 'number', min: 0, style: boxStyle, value: infants, onChange: (e: any) => setInfants(Number(e.target.value)) })
                                    )
                        ),
                h('label', { style: { fontWeight: 700, display: 'block', marginBottom: '6px' } }, 'نوع الغرفة'),
                h(
                          'select',
                  { style: { ...boxStyle, marginBottom: '16px' }, value: roomType, onChange: (e: any) => setRoomType(e.target.value) },
                          h('option', { value: 'double' }, 'غرفة مزدوجة'),
                          h('option', { value: 'triple' }, 'غرفة ثلاثية'),
                          h('option', { value: 'single' }, 'غرفة مفردة (+ رسوم إضافية)'),
                          h('option', { value: 'family' }, 'غرفة عائلية')
                        ),
                h('label', { style: { fontWeight: 700, display: 'block', marginBottom: '10px' } }, 'إضافات اختيارية'),
                h(
                          'div',
                  { style: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' } },
                          addonsList.map((a) =>
                                      h(
                                                    'label',
                                        { key: a.key, style: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' } },
                                                    h('input', { type: 'checkbox', checked: addons.includes(a.key), onChange: () => toggleAddon(a.key) }),
                                                    a.label + ' (+' + a.price + ' $)'
                                                  )
                                                 )
                        ),
                h('label', { style: { fontWeight: 700, display: 'block', marginBottom: '10px' } }, 'خيار العربون'),
                h(
                          'div',
                  { style: { display: 'flex', gap: '16px', marginBottom: '10px' } },
                          h(
                                      'label',
                            { style: { fontSize: '14px' } },
                                      h('input', { type: 'radio', name: 'deposit', checked: depositOption === '20', onChange: () => setDepositOption('20') }),
                                      ' عربون 20%'
                                    ),
                          h(
                                      'label',
                            { style: { fontSize: '14px' } },
                                      h('input', { type: 'radio', name: 'deposit', checked: depositOption === '30', onChange: () => setDepositOption('30') }),
                                      ' عربون 30%'
                                    )
                        ),
                h('p', { style: { fontSize: '12px', opacity: 0.7 } }, 'يتم دفع العربون لتأكيد الحجز، والباقي يُدفع نقداً أو بالبطاقة عند الوصول إلى جورجيا.')
              ),
        h(
                'div',
          { className: 'card', style: { padding: '22px', height: 'fit-content', position: 'sticky', top: '90px' } },
                h('h3', { style: { fontWeight: 800, fontSize: '18px', marginBottom: '14px' } }, 'ملخص الحجز (السلة)'),
                h('p', { style: { fontSize: '14px', marginBottom: '6px' } }, pkg ? pkg.title : 'لم يتم اختيار باقة بعد'),
                h('p', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '4px' } }, adults + ' بالغ × ' + basePrice + ' $'),
                kids > 0 ? h('p', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '4px' } }, kids + ' طفل × ' + (pkg ? pkg.childPrice : 0) + ' $') : null,
                roomExtra > 0 ? h('p', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '4px' } }, 'إضافة غرفة مفردة: ' + roomExtra + ' $') : null,
                addonsTotal > 0 ? h('p', { style: { fontSize: '13px', opacity: 0.75, marginBottom: '4px' } }, 'إضافات: ' + addonsTotal + ' $') : null,
                h('hr', { style: { margin: '12px 0', border: 'none', borderTop: '1px solid #eee' } }),
                h('p', { style: { fontWeight: 800, fontSize: '20px', color: '#b8862b', marginBottom: '6px' } }, 'الإجمالي: ' + total + ' $'),
                h('p', { style: { fontSize: '13px', opacity: 0.8, marginBottom: '18px' } }, 'العربون المطلوب الآن: ' + depositAmount + ' $'),
                h('button', { onClick: handleConfirm, className: 'btn-primary', style: { width: '100%', border: 'none', fontSize: '15px' } }, 'تأكيد الحجز عبر واتساب')
              )
      );
}

export default function BookingPage() {
    return h(
          'div',
      { className: 'container-p', style: { padding: '32px 20px' } },
          h('h1', { style: { fontSize: '28px', fontWeight: 800, marginBottom: '18px' } }, 'محرك الحجز'),
          h(Suspense, { fallback: h('p', {}, 'جارِ التحميل...') }, h(BookingForm, {}))
        );
}
