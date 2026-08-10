'use client';
import React, { useState } from 'react';

const h = React.createElement;

export type AccordionItem = { title: string; content: string };

export default function Accordion({ items }: { items: AccordionItem[] }) {
    const [openSet, setOpenSet] = useState<Record<number, boolean>>({ 0: true });

  const toggle = (i: number) => {
        setOpenSet((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return h(
        'div',
    { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        items.map((item, i) =>
                h(
                          'div',
                  { key: i, className: 'card' },
                          h(
                                      'button',
                            {
                                          onClick: () => toggle(i),
                                          style: {
                                                          width: '100%',
                                                          textAlign: 'right',
                                                          padding: '14px 18px',
                                                          background: 'transparent',
                                                          border: 'none',
                                                          cursor: 'pointer',
                                                          fontWeight: 700,
                                                          fontSize: '15px',
                                                          display: 'flex',
                                                          justifyContent: 'space-between'
                                          }
                            },
                                      h('span', {}, item.title),
                                      h('span', {}, openSet[i] ? '−' : '+')
                                    ),
                          openSet[i]
                            ? h('div', { style: { padding: '0 18px 16px', fontSize: '14px', lineHeight: 1.8, opacity: 0.85 } }, item.content)
                            : null
                        )
                      )
      );
}
