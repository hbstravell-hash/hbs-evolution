'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { addNotification, addTransaction, setBookingStatus } from '../lib/account';

const WHATSAPP_NUMBER = '995555165926';

type Props = {
  amount: number;
  packageTitle: string;
  packageSlug?: string;
  bookingId?: string;
  compact?: boolean;
};

/**
 * Secure payment methods block shown with every package and inside the
 * booking summary. The full booking value is always paid in one payment -
 * there is no deposit / pay-on-arrival option.
 *
 * When NEXT_PUBLIC_PAYPAL_CLIENT_ID is configured the official PayPal
 * Checkout buttons (PayPal balance + Visa / Mastercard) are rendered and the
 * captured payment is stored in the customer account. Without that key the
 * component keeps working and hands the payment over to our team on WhatsApp.
 */
export default function PaymentMethods({ amount, packageTitle, packageSlug, bookingId, compact }: Props) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const [sdkReady, setSdkReady] = useState(false);
  const [message, setMessage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const waLink = (method: string, reference?: string) => {
    const lines = [
      'مرحباً، أرغب بسداد كامل قيمة الحجز عبر ' + method + '.',
      'الباقة: ' + (packageTitle || 'غير محددة'),
      'المبلغ المطلوب: ' + amount + ' $'
    ];
    if (packageSlug) lines.push('رابط الباقة: https://hbstravel.net/packages/' + packageSlug);
    if (reference) lines.push('رقم عملية الدفع: ' + reference);
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
  };

  const handleManualMethod = (method: string) => {
    addTransaction({
      bookingId: bookingId || '',
      packageTitle: packageTitle,
      amount: amount,
      method: method,
      status: 'awaiting'
    });
    window.open(waLink(method), '_blank');
  };

  useEffect(() => {
    if (!clientId || !amount) return;
    const existing = document.getElementById('paypal-sdk') as HTMLScriptElement | null;
    if (existing) {
      if ((window as any).paypal) setSdkReady(true);
      else existing.addEventListener('load', () => setSdkReady(true));
      return;
    }
    const script = document.createElement('script');
    script.id = 'paypal-sdk';
    script.src = 'https://www.paypal.com/sdk/js?client-id=' + clientId + '&currency=USD&intent=capture';
    script.async = true;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);
  }, [clientId, amount]);

  useEffect(() => {
    const paypal = (window as any).paypal;
    if (!sdkReady || !paypal || !containerRef.current || !amount) return;
    containerRef.current.innerHTML = '';
    try {
      paypal
        .Buttons({
          style: { layout: 'vertical', color: 'gold', shape: 'pill', label: 'paypal' },
          createOrder: (_data: any, actions: any) =>
            actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  description: ('HBS Travel - ' + packageTitle).slice(0, 120),
                  amount: { value: amount.toFixed(2), currency_code: 'USD' }
                }
              ]
            }),
          onApprove: async (_data: any, actions: any) => {
            const details = await actions.order.capture();
            const reference = details && details.id ? details.id : '';
            addTransaction({
              bookingId: bookingId || '',
              packageTitle: packageTitle,
              amount: amount,
              method: 'PayPal',
              reference: reference,
              status: 'completed'
            });
            if (bookingId) setBookingStatus(bookingId, 'paid');
            addNotification({
              kind: 'booking',
              title: 'تم استلام دفعتك بنجاح',
              body: 'دفعة بقيمة ' + amount + ' $ لباقة ' + packageTitle + '. رقم العملية: ' + reference,
              href: '/account'
            });
            setMessage('تم استلام الدفعة بنجاح. تفاصيل العملية محفوظة في صفحة حسابي، وسيتواصل فريقنا معك لتأكيد الحجز.');
            window.open(waLink('PayPal', reference), '_blank');
          },
          onError: () => {
            setMessage('تعذّر إتمام الدفع الإلكتروني الآن. يمكنك إكمال الدفع بمساعدة فريقنا عبر واتساب.');
          }
        })
        .render(containerRef.current);
    } catch (err) {
      setMessage('تعذّر تحميل بوابة الدفع. يمكنك إكمال الدفع بمساعدة فريقنا عبر واتساب.');
    }
  }, [sdkReady, amount, packageTitle, bookingId]);

  const buttonBase: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    border: 'none',
    borderRadius: '10px',
    padding: compact ? '10px 14px' : '12px 16px',
    fontSize: '14px',
    fontWeight: 700,
    fontFamily: 'inherit',
    cursor: 'pointer',
    marginBottom: '10px'
  };

  return (
    <div>
      <p style={{ fontSize: '13px', fontWeight: 800, marginBottom: '10px' }}>
        وسائل الدفع الآمنة المتاحة{amount ? ' — الإجمالي ' + amount + ' $' : ''}
      </p>

      {clientId ? (
        <div ref={containerRef} style={{ marginBottom: '10px' }} />
      ) : (
        <button type="button" onClick={() => handleManualMethod('PayPal')} style={{ ...buttonBase, backgroundColor: '#ffc439', color: '#003087' }}>
          الدفع الكامل عبر PayPal
        </button>
      )}

      <button
        type="button"
        onClick={() => handleManualMethod('بطاقة ائتمانية / خصم (Visa · Mastercard)')}
        style={{ ...buttonBase, backgroundColor: '#0f2a3a', color: '#ffffff' }}
      >
        بطاقة ائتمان / خصم (Visa · Mastercard)
      </button>

      <button
        type="button"
        onClick={() => handleManualMethod('عملات مشفرة (BTC · ETH · USDT)')}
        style={{ ...buttonBase, backgroundColor: 'rgba(217,164,65,0.18)', color: '#b8862b' }}
      >
        عملات مشفرة (BTC · ETH · USDT)
      </button>

      {message ? (
        <p style={{ fontSize: '12px', fontWeight: 700, color: '#0e5a63', marginBottom: '8px', lineHeight: 1.8 }}>{message}</p>
      ) : null}

      <p style={{ fontSize: '12px', opacity: 0.7, lineHeight: 1.8, margin: 0 }}>
        يُسدَّد كامل قيمة الحجز دفعة واحدة عند التأكيد — بدون عربون أو دفعة مؤجلة.{' '}
        <Link href="/cancellation-policy" style={{ color: '#0e5a63', fontWeight: 700, textDecoration: 'underline' }}>
          سياسة الإلغاء والاسترجاع
        </Link>
      </p>
    </div>
  );
}
