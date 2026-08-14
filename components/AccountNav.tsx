'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { markNotificationsRead } from '../lib/account';
import { useAccount } from './AccountProvider';

const panelStyle: React.CSSProperties = {
  position: 'absolute',
  top: '42px',
  left: 0,
  width: '290px',
  backgroundColor: '#ffffff',
  color: '#0f2a3a',
  borderRadius: '12px',
  boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
  padding: '14px',
  zIndex: 60,
  textAlign: 'right'
};

const itemStyle: React.CSSProperties = {
  display: 'block',
  padding: '8px 0',
  borderBottom: '1px solid #f0ece4',
  textDecoration: 'none',
  color: 'inherit'
};

/** Account shortcut + notifications bell shown inside the main navbar. */
export default function AccountNav() {
  const { user, data, ready } = useAccount();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const unread = data.notifications.filter((n) => !n.read).length;
  const latest = data.notifications.slice(0, 6);

  useEffect(() => {
    if (!open) return undefined;
    const onDocumentClick = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, [open]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && unread > 0) markNotificationsRead();
  };

  const firstName = user ? user.name.split(' ')[0] : '';

  return (
    <div ref={boxRef} style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
      <button
        type="button"
        onClick={toggle}
        aria-label="الإشعارات"
        style={{
          position: 'relative',
          backgroundColor: 'rgba(255,255,255,0.12)',
          border: 'none',
          borderRadius: '999px',
          width: '34px',
          height: '34px',
          color: '#f6efe3',
          fontSize: '15px',
          cursor: 'pointer'
        }}
      >
        <span aria-hidden="true">{'\uD83D\uDD14'}</span>
        {ready && unread > 0 ? (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              left: '-4px',
              minWidth: '18px',
              height: '18px',
              lineHeight: '18px',
              borderRadius: '999px',
              backgroundColor: '#d9a441',
              color: '#0f2a3a',
              fontSize: '11px',
              fontWeight: 800
            }}
          >
            {unread}
          </span>
        ) : null}
      </button>

      <Link
        href="/account"
        className="nav-link"
        style={{
          color: '#f6efe3',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 700,
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderRadius: '999px',
          padding: '7px 14px',
          whiteSpace: 'nowrap'
        }}
      >
        {ready && user ? 'حسابي · ' + firstName : 'حسابي / تسجيل الدخول'}
      </Link>

      {open ? (
        <div style={panelStyle}>
          <div style={{ fontWeight: 800, fontSize: '13px', marginBottom: '6px' }}>الإشعارات</div>
          {latest.length === 0 ? (
            <p style={{ fontSize: '12px', opacity: 0.7, margin: 0, lineHeight: 1.8 }}>
              لا توجد إشعارات بعد. أضف الباقات التي تهمك إلى المفضلة ليصلك إشعار تلقائي عند أي تغيير في سعرها.
            </p>
          ) : (
            latest.map((note) => (
              <Link key={note.id} href={note.href || '/account'} style={itemStyle} onClick={() => setOpen(false)}>
                <div style={{ fontWeight: 700, fontSize: '12px', marginBottom: '2px' }}>{note.title}</div>
                <div style={{ fontSize: '12px', opacity: 0.75, lineHeight: 1.7 }}>{note.body}</div>
              </Link>
            ))
          )}
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            style={{ display: 'block', marginTop: '10px', fontSize: '12px', fontWeight: 700, color: '#0e5a63', textDecoration: 'none' }}
          >
            حسابي: الحجوزات والمعاملات والمفضلة ←
          </Link>
        </div>
      ) : null}
    </div>
  );
}
