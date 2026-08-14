'use client';

/**
 * HBS Travel - customer account store (browser side).
 *
 * Stores customer accounts, bookings, transactions, favourites and
 * price-change notifications inside localStorage so the feature works on
 * the current hosting setup without a database. Every helper is safe to
 * call while rendering on the server: it returns empty values when there
 * is no window object.
 */

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
};

export type BookingStatus = 'pending' | 'paid' | 'cancelled';

export type Booking = {
  id: string;
  packageSlug: string;
  packageTitle: string;
  checkIn: string;
  adults: number;
  kids: number;
  infants: number;
  roomType: string;
  addons: string[];
  total: number;
  status: BookingStatus;
  paymentMethod: string;
  createdAt: string;
};

export type Transaction = {
  id: string;
  bookingId: string;
  packageTitle: string;
  amount: number;
  method: string;
  reference: string;
  status: 'awaiting' | 'completed' | 'refunded';
  createdAt: string;
};

export type Favorite = {
  slug: string;
  title: string;
  image: string;
  savedPrice: number;
  lastKnownPrice: number;
  savedAt: string;
};

export type AppNotification = {
  id: string;
  kind: 'price' | 'booking' | 'system';
  title: string;
  body: string;
  href: string;
  read: boolean;
  createdAt: string;
};

export type AccountData = {
  bookings: Booking[];
  transactions: Transaction[];
  favorites: Favorite[];
  notifications: AppNotification[];
};

const USERS_KEY = 'hbs.users.v1';
const SESSION_KEY = 'hbs.session.v1';
const DATA_PREFIX = 'hbs.data.v1.';

export const ACCOUNT_EVENT = 'hbs:account-changed';

const EMPTY: AccountData = { bookings: [], transactions: [], favorites: [], notifications: [] };

function browser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function read(key: string, fallback: any): any {
  if (!browser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}

function write(key: string, value: any): void {
  if (!browser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    /* storage blocked or full - ignore silently */
  }
}

function uid(prefix: string): string {
  return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
}

export function notifyChange(): void {
  if (browser()) window.dispatchEvent(new Event(ACCOUNT_EVENT));
}

export function subscribe(listener: () => void): () => void {
  if (!browser()) return () => undefined;
  window.addEventListener(ACCOUNT_EVENT, listener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(ACCOUNT_EVENT, listener);
    window.removeEventListener('storage', listener);
  };
}

/* ------------------------------ accounts ------------------------------ */

function getUsers(): StoredUser[] {
  return read(USERS_KEY, []) as StoredUser[];
}

export async function hashPassword(email: string, password: string): Promise<string> {
  const source = 'hbs::' + email.trim().toLowerCase() + '::' + password;
  if (browser() && window.crypto && window.crypto.subtle) {
    const bytes = new TextEncoder().encode(source);
    const digest = await window.crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return 'plain:' + source;
}

export function getCurrentUser(): StoredUser | null {
  const id = read(SESSION_KEY, '') as string;
  if (!id) return null;
  return getUsers().find((u) => u.id === id) || null;
}

export async function registerUser(input: { name: string; email: string; phone: string; password: string }) {
  const email = (input.email || '').trim().toLowerCase();
  if (!(input.name || '').trim()) return { ok: false, error: 'الرجاء إدخال الاسم الكامل.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'الرجاء إدخال بريد إلكتروني صحيح.' };
  if ((input.password || '').length < 6) return { ok: false, error: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.' };

  const users = getUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: 'هذا البريد مسجَّل مسبقاً، الرجاء تسجيل الدخول.' };
  }

  const user: StoredUser = {
    id: uid('usr'),
    name: input.name.trim(),
    email: email,
    phone: (input.phone || '').trim(),
    passwordHash: await hashPassword(email, input.password),
    createdAt: new Date().toISOString()
  };

  write(USERS_KEY, users.concat(user));
  write(SESSION_KEY, user.id);
  mergeGuestData(user.id);
  addNotification({
    kind: 'system',
    title: 'مرحباً بك في HBS Travel',
    body: 'تم إنشاء حسابك بنجاح. يمكنك الآن متابعة حجوزاتك ومعاملاتك وحفظ الباقات المفضلة وتلقّي إشعار عند أي تغيير في الأسعار.',
    href: '/account'
  });
  notifyChange();
  return { ok: true, user: user };
}

export async function loginUser(emailInput: string, password: string) {
  const email = (emailInput || '').trim().toLowerCase();
  const user = getUsers().find((u) => u.email === email);
  if (!user) return { ok: false, error: 'لا يوجد حساب مرتبط بهذا البريد الإلكتروني.' };
  const hash = await hashPassword(email, password);
  if (hash !== user.passwordHash) return { ok: false, error: 'كلمة المرور غير صحيحة.' };
  write(SESSION_KEY, user.id);
  mergeGuestData(user.id);
  notifyChange();
  return { ok: true, user: user };
}

export function logoutUser(): void {
  write(SESSION_KEY, '');
  notifyChange();
}

export function updateProfile(patch: { name?: string; phone?: string }) {
  const current = getCurrentUser();
  if (!current) return { ok: false, error: 'الرجاء تسجيل الدخول أولاً.' };
  const users = getUsers().map((u) =>
    u.id === current.id
      ? { ...u, name: patch.name !== undefined ? patch.name : u.name, phone: patch.phone !== undefined ? patch.phone : u.phone }
      : u
  );
  write(USERS_KEY, users);
  notifyChange();
  return { ok: true };
}

/* ------------------------------- data --------------------------------- */

function dataKey(): string {
  const user = getCurrentUser();
  return DATA_PREFIX + (user ? user.id : 'guest');
}

export function getAccountData(): AccountData {
  const data = read(dataKey(), EMPTY) as AccountData;
  return {
    bookings: data.bookings || [],
    transactions: data.transactions || [],
    favorites: data.favorites || [],
    notifications: data.notifications || []
  };
}

function saveData(data: AccountData): void {
  write(dataKey(), data);
  notifyChange();
}

function mergeGuestData(userId: string): void {
  const guest = read(DATA_PREFIX + 'guest', EMPTY) as AccountData;
  const owned = read(DATA_PREFIX + userId, EMPTY) as AccountData;
  const favorites = (owned.favorites || []).slice();
  (guest.favorites || []).forEach((fav) => {
    if (!favorites.some((f) => f.slug === fav.slug)) favorites.push(fav);
  });
  write(DATA_PREFIX + userId, {
    bookings: (owned.bookings || []).concat(guest.bookings || []),
    transactions: (owned.transactions || []).concat(guest.transactions || []),
    favorites: favorites,
    notifications: (owned.notifications || []).concat(guest.notifications || [])
  });
  write(DATA_PREFIX + 'guest', EMPTY);
}

/* ----------------------------- bookings ------------------------------- */

export function addBooking(input: Partial<Booking>): Booking {
  const data = getAccountData();
  const booking: Booking = {
    id: uid('bkg'),
    packageSlug: input.packageSlug || '',
    packageTitle: input.packageTitle || '',
    checkIn: input.checkIn || '',
    adults: input.adults || 0,
    kids: input.kids || 0,
    infants: input.infants || 0,
    roomType: input.roomType || '',
    addons: input.addons || [],
    total: input.total || 0,
    status: input.status || 'pending',
    paymentMethod: input.paymentMethod || '',
    createdAt: new Date().toISOString()
  };
  data.bookings.unshift(booking);
  data.notifications.unshift({
    id: uid('ntf'),
    kind: 'booking',
    title: 'تم تسجيل طلب حجز جديد',
    body: booking.packageTitle + ' — الإجمالي ' + booking.total + ' $. سيتواصل فريقنا معك لتأكيد التفاصيل.',
    href: '/account',
    read: false,
    createdAt: new Date().toISOString()
  });
  saveData(data);
  return booking;
}

export function setBookingStatus(bookingId: string, status: BookingStatus): void {
  const data = getAccountData();
  data.bookings = data.bookings.map((b) => (b.id === bookingId ? { ...b, status: status } : b));
  saveData(data);
}

export function addTransaction(input: Partial<Transaction>): Transaction {
  const data = getAccountData();
  const trx: Transaction = {
    id: uid('trx'),
    bookingId: input.bookingId || '',
    packageTitle: input.packageTitle || '',
    amount: input.amount || 0,
    method: input.method || '',
    reference: input.reference || '',
    status: input.status || 'awaiting',
    createdAt: new Date().toISOString()
  };
  data.transactions.unshift(trx);
  saveData(data);
  return trx;
}

/* ----------------------------- favourites ----------------------------- */

export function isFavorite(slug: string): boolean {
  return getAccountData().favorites.some((f) => f.slug === slug);
}

export function toggleFavorite(item: { slug: string; title: string; image?: string; price: number }): boolean {
  const data = getAccountData();
  const exists = data.favorites.some((f) => f.slug === item.slug);
  if (exists) {
    data.favorites = data.favorites.filter((f) => f.slug !== item.slug);
    saveData(data);
    return false;
  }
  data.favorites.unshift({
    slug: item.slug,
    title: item.title,
    image: item.image || '',
    savedPrice: item.price,
    lastKnownPrice: item.price,
    savedAt: new Date().toISOString()
  });
  saveData(data);
  return true;
}

/* ---------------------------- notifications --------------------------- */

export function addNotification(input: { kind: AppNotification['kind']; title: string; body: string; href?: string }): void {
  const data = getAccountData();
  data.notifications.unshift({
    id: uid('ntf'),
    kind: input.kind,
    title: input.title,
    body: input.body,
    href: input.href || '',
    read: false,
    createdAt: new Date().toISOString()
  });
  saveData({ ...data, notifications: data.notifications.slice(0, 60) });
}

export function unreadCount(): number {
  return getAccountData().notifications.filter((n) => !n.read).length;
}

export function markNotificationsRead(): void {
  const data = getAccountData();
  data.notifications = data.notifications.map((n) => ({ ...n, read: true }));
  saveData(data);
}

export function clearNotifications(): void {
  const data = getAccountData();
  data.notifications = [];
  saveData(data);
}

/* -------------------------- price monitoring -------------------------- */

export function priceAlertsState(): string {
  if (!browser() || typeof window.Notification === 'undefined') return 'unsupported';
  return window.Notification.permission;
}

export async function enablePriceAlerts(): Promise<string> {
  if (!browser() || typeof window.Notification === 'undefined') return 'unsupported';
  if (window.Notification.permission === 'granted') return 'granted';
  try {
    return await window.Notification.requestPermission();
  } catch (err) {
    return 'denied';
  }
}

export function pushBrowserNotification(title: string, body: string, href?: string): void {
  if (!browser() || typeof window.Notification === 'undefined') return;
  if (window.Notification.permission !== 'granted') return;
  try {
    const note = new window.Notification(title, { body: body, icon: 'https://hbstravel.ge/logo.png' });
    if (href) {
      note.onclick = function () {
        window.focus();
        window.location.href = href;
      };
    }
  } catch (err) {
    /* notifications not available - the in-site bell still works */
  }
}

/**
 * Compares the live package prices with the price stored for every
 * favourite package and raises an automatic notification (in-site bell +
 * browser notification) whenever a saved package changed its price.
 */
export function syncFavoritePrices(current: { slug: string; price: number }[]): number {
  const data = getAccountData();
  if (!data.favorites.length) return 0;
  let changes = 0;

  const favorites = data.favorites.map((fav) => {
    const live = current.find((c) => c.slug === fav.slug);
    if (!live) return fav;
    const previous = typeof fav.lastKnownPrice === 'number' ? fav.lastKnownPrice : fav.savedPrice;
    if (live.price === previous) return fav;

    changes += 1;
    const down = live.price < previous;
    const title = down ? 'انخفض سعر باقة في قائمة مفضلتك' : 'تغيّر سعر باقة في قائمة مفضلتك';
    const body =
      fav.title + ': ' + (down ? 'انخفض من ' : 'تغيّر من ') + previous + ' $ إلى ' + live.price + ' $ للفرد.';
    data.notifications.unshift({
      id: uid('ntf'),
      kind: 'price',
      title: title,
      body: body,
      href: '/packages/' + fav.slug,
      read: false,
      createdAt: new Date().toISOString()
    });
    pushBrowserNotification(title, body, '/packages/' + fav.slug);
    return { ...fav, lastKnownPrice: live.price };
  });

  if (!changes) return 0;
  saveData({ ...data, favorites: favorites, notifications: data.notifications.slice(0, 60) });
  return changes;
}

