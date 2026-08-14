'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { packages } from '../../lib/data';
import {
  clearNotifications,
  enablePriceAlerts,
  loginUser,
  logoutUser,
  markNotificationsRead,
  priceAlertsState,
  registerUser,
  toggleFavorite
} from '../../lib/account';
import { useAccount } from '../../components/AccountProvider';
import PaymentMethods from '../../components/PaymentMethods';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '14px',
  fontFamily: 'inherit',
  marginBottom: '12px'
};

const tabs = [
  { key: 'bookings', label: 'حجوزاتي' },
  { key: 'transactions', label: 'معاملاتي المالية' },
  { key: 'favorites', label: 'المفضلة' },
  { key: 'notifications', label: 'الإشعارات' }
];

const bookingStatusLabel = (status: string) =>
  status === 'paid' ? 'مدفوع بالكامل' : status === 'cancelled' ? 'ملغي' : 'بانتظار التأكيد';

const trxStatusLabel = (status: string) =>
  status === 'completed' ? 'مكتملة' : status === 'refunded' ? 'مسترجعة' : 'بانتظار الاستلام';

const formatDate = (value: string) => {
  try {
    return new Date(value).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (err) {
    return value;
  }
};

function AuthPanel() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const result =
      mode === 'login'
        ? await loginUser(email, password)
        : await registerUser({ name: name, email: email, phone: phone, password: password });
    setBusy(false);
    if (!result.ok) setError(result.error || 'تعذّر إكمال العملية، الرجاء المحاولة مرة أخرى.');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
      <form className="card" style={{ padding: '22px' }} onSubmit={submit}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
          <button
            type="button"
            onClick={() => setMode('login')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '999px',
              border: 'none',
              fontFamily: 'inherit',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: mode === 'login' ? '#0e5a63' : 'rgba(14,90,99,0.10)',
              color: mode === 'login' ? '#ffffff' : '#0f2a3a'
            }}
          >
            تسجيل الدخول
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '999px',
              border: 'none',
              fontFamily: 'inherit',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: mode === 'register' ? '#0e5a63' : 'rgba(14,90,99,0.10)',
              color: mode === 'register' ? '#ffffff' : '#0f2a3a'
            }}
          >
            حساب جديد
          </button>
        </div>

        {mode === 'register' ? (
          <input style={inputStyle} placeholder="الاسم الكامل" value={name} onChange={(e) => setName(e.target.value)} />
        ) : null}
        <input style={inputStyle} type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
        {mode === 'register' ? (
          <input style={inputStyle} placeholder="رقم الجوال (واتساب)" value={phone} onChange={(e) => setPhone(e.target.value)} />
        ) : null}
        <input style={inputStyle} type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error ? <p style={{ color: '#b23b3b', fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>{error}</p> : null}

        <button type="submit" className="btn-primary" disabled={busy} style={{ width: '100%', border: 'none', fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit' }}>
          {busy ? 'جاري المعالجة...' : mode === 'login' ? 'دخول إلى حسابي' : 'إنشاء الحساب'}
        </button>

        <p style={{ fontSize: '11px', opacity: 0.65, marginTop: '12px', lineHeight: 1.8 }}>
          بيانات الحساب تُحفظ في متصفحك على هذا الجهاز فقط ولا تُرسل إلى أي طرف ثالث، ولا نطلب أي بيانات بطاقات بنكية.
        </p>
      </form>

      <div className="card" style={{ padding: '22px' }}>
        <h2 style={{ fontWeight: 800, fontSize: '18px', marginBottom: '12px' }}>مزايا حساب العميل</h2>
        <ul style={{ paddingRight: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', lineHeight: 1.8 }}>
          <li>متابعة كل حجوزاتك وحالتها (بانتظار التأكيد / مدفوع بالكامل).</li>
          <li>سجل كامل لمعاملاتك المالية مع رقم عملية الدفع لكل عملية.</li>
          <li>قائمة مفضلة تحفظ الباقات التي تهمك للرجوع إليها في أي وقت.</li>
          <li>إشعار تلقائي عند أي تغيير في سعر أي باقة محفوظة في مفضلتك.</li>
          <li>إكمال الدفع الكامل لأي حجز معلّق مباشرة من صفحة حسابي.</li>
        </ul>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const { user, data, ready } = useAccount();
  const [tab, setTab] = useState('bookings');
  const [payFor, setPayFor] = useState('');
  const [alerts, setAlerts] = useState('');

  if (!ready) {
    return (
      <div className="container-p" style={{ padding: '40px 20px' }}>
        <p style={{ opacity: 0.7 }}>جاري تحميل بيانات حسابك...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-p" style={{ padding: '32px 20px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '8px' }}>حساب العميل</h1>
        <p style={{ opacity: 0.75, marginBottom: '24px' }}>
          أنشئ حسابك لمتابعة حجوزاتك ومعاملاتك، وحفظ باقاتك المفضلة، واستلام إشعار تلقائي عند تغيّر أسعارها.
        </p>
        <AuthPanel />
      </div>
    );
  }

  const alertsState = alerts || priceAlertsState();

  const enableAlerts = async () => {
    const result = await enablePriceAlerts();
    setAlerts(result);
  };

  return (
    <div className="container-p" style={{ padding: '32px 20px' }}>
      <div className="card" style={{ padding: '20px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '4px' }}>مرحباً {user.name}</h1>
          <p style={{ fontSize: '13px', opacity: 0.7 }}>{user.email}{user.phone ? ' — ' + user.phone : ''}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {alertsState === 'granted' ? (
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0e5a63', alignSelf: 'center' }}>إشعارات الأسعار مفعّلة</span>
          ) : (
            <button type="button" onClick={enableAlerts} style={{ padding: '9px 16px', borderRadius: '999px', border: '1px solid #b8862b', backgroundColor: 'rgba(217,164,65,0.16)', color: '#b8862b', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', fontSize: '13px' }}>
              تشغيل إشعارات تغيّر الأسعار
            </button>
          )}
          <button type="button" onClick={() => logoutUser()} style={{ padding: '9px 16px', borderRadius: '999px', border: '1px solid rgba(15,42,58,0.2)', backgroundColor: '#ffffff', fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', fontSize: '13px' }}>
            خروج
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
        {tabs.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            style={{
              padding: '9px 16px',
              borderRadius: '999px',
              border: 'none',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              backgroundColor: tab === item.key ? '#0f2a3a' : 'rgba(15,42,58,0.08)',
              color: tab === item.key ? '#f6efe3' : '#0f2a3a'
            }}
          >
            {item.label}
            {item.key === 'notifications' && data.notifications.filter((n) => !n.read).length > 0
              ? ' (' + data.notifications.filter((n) => !n.read).length + ')'
              : ''}
          </button>
        ))}
      </div>

      {tab === 'bookings' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {data.bookings.length === 0 ? (
            <div className="card" style={{ padding: '20px' }}>
              <p style={{ marginBottom: '12px' }}>لا توجد حجوزات بعد.</p>
              <Link href="/packages" className="btn-primary" style={{ textDecoration: 'none' }}>تصفح الباكيجات</Link>
            </div>
          ) : (
            data.bookings.map((booking) => (
              <div key={booking.id} className="card" style={{ padding: '18px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '16px' }}>{booking.packageTitle}</strong>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: booking.status === 'paid' ? '#0e5a63' : '#b8862b' }}>
                    {bookingStatusLabel(booking.status)}
                  </span>
                </div>
                <p style={{ fontSize: '13px', opacity: 0.75, marginBottom: '4px' }}>
                  رقم الحجز: {booking.id} — تاريخ الطلب: {formatDate(booking.createdAt)}
                </p>
                <p style={{ fontSize: '13px', opacity: 0.75, marginBottom: '4px' }}>
                  تاريخ الوصول: {booking.checkIn || 'غير محدد'} — بالغ: {booking.adults} / طفل: {booking.kids} / رضيع: {booking.infants}
                </p>
                {booking.addons && booking.addons.length ? (
                  <p style={{ fontSize: '13px', opacity: 0.75, marginBottom: '4px' }}>الإضافات: {booking.addons.join('، ')}</p>
                ) : null}
                <p style={{ fontWeight: 800, color: '#b8862b', marginBottom: '10px' }}>الإجمالي: {booking.total} $</p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {booking.packageSlug ? (
                    <Link href={'/packages/' + booking.packageSlug} style={{ fontSize: '13px', fontWeight: 700, color: '#0e5a63' }}>
                      تفاصيل الباقة ←
                    </Link>
                  ) : null}
                  {booking.status !== 'paid' ? (
                    <button
                      type="button"
                      onClick={() => setPayFor(payFor === booking.id ? '' : booking.id)}
                      style={{ padding: '8px 14px', borderRadius: '999px', border: '1px solid #0e5a63', backgroundColor: 'rgba(14,90,99,0.08)', color: '#0e5a63', fontWeight: 700, fontFamily: 'inherit', fontSize: '13px', cursor: 'pointer' }}
                    >
                      {payFor === booking.id ? 'إخفاء وسائل الدفع' : 'إكمال الدفع الكامل'}
                    </button>
                  ) : null}
                </div>

                {payFor === booking.id ? (
                  <div style={{ marginTop: '14px', borderTop: '1px solid #eee', paddingTop: '14px' }}>
                    <PaymentMethods amount={booking.total} packageTitle={booking.packageTitle} packageSlug={booking.packageSlug} bookingId={booking.id} compact />
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      ) : null}

      {tab === 'transactions' ? (
        <div className="card" style={{ padding: '18px' }}>
          {data.transactions.length === 0 ? (
            <p style={{ margin: 0 }}>لا توجد معاملات مالية مسجَّلة بعد.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.transactions.map((trx) => (
                <div key={trx.id} style={{ borderBottom: '1px solid #f0ece4', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <strong style={{ fontSize: '14px' }}>{trx.packageTitle || 'حجز'}</strong>
                    <span style={{ fontWeight: 800, color: '#b8862b' }}>{trx.amount} $</span>
                  </div>
                  <p style={{ fontSize: '12px', opacity: 0.75, margin: '4px 0 0' }}>
                    {formatDate(trx.createdAt)} — وسيلة الدفع: {trx.method} — الحالة: {trxStatusLabel(trx.status)}
                    {trx.reference ? ' — رقم العملية: ' + trx.reference : ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {tab === 'favorites' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {data.favorites.length === 0 ? (
            <div className="card" style={{ padding: '20px' }}>
              <p style={{ marginBottom: '12px' }}>قائمة المفضلة فارغة. اضغط على رمز القلب في أي باقة لإضافتها ومتابعة سعرها.</p>
              <Link href="/packages" className="btn-primary" style={{ textDecoration: 'none' }}>تصفح الباكيجات</Link>
            </div>
          ) : (
            data.favorites.map((fav) => {
              const live = packages.find((p) => p.slug === fav.slug);
              const currentPrice = live ? live.priceFrom : fav.lastKnownPrice;
              const diff = currentPrice - fav.savedPrice;
              return (
                <div key={fav.slug} className="card" style={{ overflow: 'hidden' }}>
                  {fav.image ? <img src={fav.image} alt={fav.title} style={{ height: '140px', width: '100%', objectFit: 'cover' }} /> : null}
                  <div style={{ padding: '16px' }}>
                    <strong style={{ display: 'block', marginBottom: '6px' }}>{fav.title}</strong>
                    <p style={{ fontWeight: 800, color: '#b8862b', marginBottom: '4px' }}>السعر الحالي: {currentPrice} $</p>
                    <p style={{ fontSize: '12px', opacity: 0.75, marginBottom: '8px' }}>
                      السعر عند الحفظ: {fav.savedPrice} $
                      {diff === 0 ? ' — لا تغيير' : diff < 0 ? ' — انخفض ' + Math.abs(diff) + ' $' : ' — ارتفع ' + diff + ' $'}
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <Link href={'/packages/' + fav.slug} style={{ fontSize: '13px', fontWeight: 700, color: '#0e5a63' }}>التفاصيل والحجز ←</Link>
                      <button
                        type="button"
                        onClick={() => toggleFavorite({ slug: fav.slug, title: fav.title, image: fav.image, price: currentPrice })}
                        style={{ background: 'none', border: 'none', color: '#b23b3b', fontWeight: 700, fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer', padding: 0 }}
                      >
                        إزالة
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : null}

      {tab === 'notifications' ? (
        <div className="card" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap' }}>
            <strong style={{ fontSize: '15px' }}>سجل الإشعارات</strong>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" onClick={() => markNotificationsRead()} style={{ background: 'none', border: 'none', color: '#0e5a63', fontWeight: 700, fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}>
                تحديد الكل كمقروء
              </button>
              <button type="button" onClick={() => clearNotifications()} style={{ background: 'none', border: 'none', color: '#b23b3b', fontWeight: 700, fontSize: '13px', fontFamily: 'inherit', cursor: 'pointer' }}>
                حذف الكل
              </button>
            </div>
          </div>
          {data.notifications.length === 0 ? (
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.8 }}>
              لا توجد إشعارات. أضف باقات إلى المفضلة وسنُشعرك تلقائياً عند أي تغيير في أسعارها.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.notifications.map((note) => (
                <div key={note.id} style={{ borderRight: note.read ? '3px solid #eee' : '3px solid #d9a441', paddingRight: '10px' }}>
                  <strong style={{ fontSize: '14px' }}>{note.title}</strong>
                  <p style={{ fontSize: '13px', opacity: 0.8, margin: '4px 0', lineHeight: 1.7 }}>{note.body}</p>
                  <span style={{ fontSize: '11px', opacity: 0.6 }}>{formatDate(note.createdAt)}</span>
                  {note.href ? (
                    <Link href={note.href} style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0e5a63', marginTop: '4px' }}>
                      عرض التفاصيل ←
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

