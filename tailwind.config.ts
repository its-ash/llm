import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'app.vue',
    'plugins/**/*.ts'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}