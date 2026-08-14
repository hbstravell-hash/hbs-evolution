'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { packages } from '../lib/data';
import {
  AccountData,
  StoredUser,
  getAccountData,
  getCurrentUser,
  subscribe,
  syncFavoritePrices
} from '../lib/account';

const EMPTY_DATA: AccountData = { bookings: [], transactions: [], favorites: [], notifications: [] };

type AccountContextValue = {
  user: StoredUser | null;
  data: AccountData;
  ready: boolean;
  refresh: () => void;
};

const AccountContext = createContext<AccountContextValue>({
  user: null,
  data: EMPTY_DATA,
  ready: false,
  refresh: () => undefined
});

export function useAccount(): AccountContextValue {
  return useContext(AccountContext);
}

/**
 * Provides the signed-in customer with his bookings, transactions and
 * favourites, and keeps watching the live package prices so that a saved
 * (favourite) package raises an automatic notification as soon as its
 * price changes.
 */
export default function AccountProvider({ children }: { children?: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [data, setData] = useState<AccountData>(EMPTY_DATA);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setUser(getCurrentUser());
    setData(getAccountData());
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);
    return subscribe(refresh);
  }, [refresh]);

  useEffect(() => {
    const livePrices = packages.map((p) => ({ slug: p.slug, price: p.priceFrom }));
    const check = () => {
      syncFavoritePrices(livePrices);
    };
    check();
    const timer = window.setInterval(check, 5 * 60 * 1000);
    window.addEventListener('focus', check);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', check);
    };
  }, []);

  const value = useMemo(
    () => ({ user: user, data: data, ready: ready, refresh: refresh }),
    [user, data, ready, refresh]
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

