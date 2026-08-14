'use client';

import React, { useState } from 'react';
import { enablePriceAlerts, toggleFavorite } from '../lib/account';
import { useAccount } from './AccountProvider';

type Props = {
  slug: string;
  title: string;
  image?: string;
  price: number;
  withLabel?: boolean;
};

/**
 * Heart button that saves a package to the customer favourites list and asks
 * for the browser notification permission the first time, so the customer can
 * receive an automatic alert when the price of a saved package changes.
 */
export default function FavoriteButton({ slug, title, image, price, withLabel }: Props) {
  const { data, ready } = useAccount();
  const [busy, setBusy] = useState(false);
  const active = ready && data.favorites.some((f) => f.slug === slug);

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (busy) return;
    setBusy(true);
    const added = toggleFavorite({ slug: slug, title: title, image: image || '', price: price });
    if (added) await enablePriceAlerts();
    setBusy(false);
  };

  const labelText = active ? 'في المفضلة' : 'أضف إلى المفضلة';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={labelText}
      title={active ? 'إزالة من قائمة المفضلة' : 'حفظ في المفضلة ومتابعة تغيّر السعر'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: withLabel ? '8px 14px' : '6px 10px',
        borderRadius: '9999px',
        border: active ? '1px solid #b8862b' : '1px solid rgba(15,42,58,0.18)',
        backgroundColor: active ? 'rgba(217,164,65,0.18)' : '#ffffff',
        color: active ? '#b8862b' : '#0f2a3a',
        fontSize: '13px',
        fontWeight: 700,
        fontFamily: 'inherit',
        cursor: 'pointer'
      }}
    >
      <span style={{ fontSize: '15px', lineHeight: 1 }}>{active ? '\u2665' : '\u2661'}</span>
      {withLabel ? <span>{labelText}</span> : null}
    </button>
  );
}

