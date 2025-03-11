/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#6B4E71',
        accent: '#8B7355',
        text: '#2C3E50',
        container: 'rgba(247, 245, 251, 0.85)',
      },
      backgroundImage: {
        'meditation': "url('https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?auto=format&fit=crop&w=2000&q=80')",
      },
    },
  },
  plugins: [],
}
