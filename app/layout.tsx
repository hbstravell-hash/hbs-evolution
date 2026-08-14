import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import AccountProvider from '../components/AccountProvider';

const h = React.createElement;

export const metadata: Metadata = {
title: 'HBS Travel | رحلات جورجيا للعائلات الخليجية',
description: 'HBS Travel LLC منظم رحلات سياحية متخصص في جورجيا لعملاء دول الخليج، باكيجات جاهزة ورحلات مصممة خصيصاً مع مرشدين يتحدثون العربية ومطاعم حلال وسائق خاص.',
keywords: ['السياحة في جورجيا', 'رحلات تبليسي', 'رحلات باتومي', 'باكيجات جورجيا', 'رحلات عائلية جورجيا'],
icons: { icon: 'https://hbstravel.ge/logo.png' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
return h(
'html',
{ lang: 'ar', dir: 'rtl' },
h(
'body',
{},
h(
AccountProvider,
{},
h(Navbar, {}),
h('main', { style: { minHeight: '60vh' } }, children),
h(Footer, {}),
h(WhatsAppButton, {})
)
)
);
}
