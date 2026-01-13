import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Nature Palette
        primary: '#0f5132',
        secondary: '#2ecc71',
        accent: '#d4af37',

        // Mapping legacy names to new palette or similar
        primaryColor: '#0f5132',
        secondaryColor: '#2ecc71',
        inputLabelolor: '#D9D9D9',
        bgColor: '#ffffff',
        textColor: '#002718',
        primaryButtonColor: '#0f5132', // Mapped to primary
        secondaryButtonColor: '#d4af37', // Mapped to accent
        primaryButtonHoverColor: '#0a3d24', // Darker primary
        secondaryButtonHoverColor: '#b3922b', // Darker accent
        cartBg: '#EFEFEF',
        bgRed: '#DC2626',

        muted: '#D9D9D9',
        background: '#ffffff',
        foreground: '#002718',
        destructive: '#DC2626'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primaryColor: '#007546',
//         secondaryColor: '#00D480',
//         inputLabelolor: '#D9D9D9',
//         bgColor: '#ffffff',
//         textColor: '#002718',
//         primaryButtonColor: '#00AD1d',
//         secondaryButtonColor: '#FF8000',
//         primaryButtonHoverColor: '#006B12',
//         secondaryButtonHoverColor: '#834100',
//         cartBg: '#EFEFEF',
//         bgRed: '#DC2626',
//         primary: '#007546',          // Previously primaryColor
//         secondary: '#00D480',        // Previously secondaryColor
//         muted: '#D9D9D9',            // Previously inputLabelColor
//         background: '#ffffff',       // Previously bgColor
//         foreground: '#002718',       // Previously textColor
//         primaryButton: '#00AD1d',    // Primary button color
//         secondaryButton: '#FF8000',  // Secondary button color
//         destructive: '#DC2626'
//       },
//       animation: {
//         quantumSpin: 'quantum-spin 2s linear infinite',
//         particleWave: 'particle-wave 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//         morph: 'morph 2s ease-in-out infinite',
//         orbital: 'orbital 2s linear infinite',
//         shimmer: 'shimmer 1.5s infinite linear'
//       },
//       keyframes: {
//         'quantum-spin': {
//           from: { transform: 'rotate(0deg)' },
//           to: { transform: 'rotate(360deg)' }
//         },
//         'particle-wave': {
//           '0%, 100%': { transform: 'translateY(0)' },
//           '50%': { transform: 'translateY(-15px)' }
//         },
//         'morph': {
//           '0%': {
//             borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%',
//             transform: 'scale(1)'
//           },
//           '50%': {
//             borderRadius: '50%',
//             transform: 'scale(0.8)'
//           },
//           '100%': {
//             borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%',
//             transform: 'scale(1)'
//           }
//         },
//         'orbital': {
//           from: { transform: 'rotate(0deg) translateX(20px) rotate(0deg)' },
//           to: { transform: 'rotate(360deg) translateX(20px) rotate(-360deg)' }
//         },
//         'shimmer': {
//           '100%': { transform: 'translateX(100%)' }
//         }
//       }
//     },
//   },
//   plugins: [],
// } satisfies Config;

