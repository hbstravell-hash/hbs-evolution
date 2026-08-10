import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
          './app/**/*.{ts,tsx}',
          './components/**/*.{ts,tsx}'
        ],
    theme: {
          extend: {
                  colors: {
                            sand: '#f6efe3',
                            gold: '#b8862b',
                            night: '#0f2a3a',
                            teal: '#0e5a63'
                  }
          }
    },
    plugins: []
};

export default config;
