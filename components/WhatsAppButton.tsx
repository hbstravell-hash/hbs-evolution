import React from 'react';

export default function WhatsAppButton() {
const phone = '995555165926';
const message = encodeURIComponent('مرحباً، أرغب بالاستفسار عن رحلات جورجيا مع HBS Travel');
const href = 'https://wa.me/' + phone + '?text=' + message;

return React.createElement(
'a',
{
href: href,
target: '_blank',
rel: 'noopener noreferrer',
'aria-label': 'تواصل معنا عبر واتساب',
style: {
position: 'fixed',
bottom: '22px',
left: '22px',
zIndex: 50,
backgroundColor: '#25D366',
color: '#ffffff',
width: '60px',
height: '60px',
borderRadius: '9999px',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
fontSize: '28px',
textDecoration: 'none'
}
},
React.createElement('span', { 'aria-hidden': 'true' }, '💬')
);
}
