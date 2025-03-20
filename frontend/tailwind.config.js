/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["light", "dark", "cupcake"],
    },
    daisyui: {
      themes: [
        {
          blacktheme: {
            "primary": "#0d0d0d", // Black primary color
            "secondary": "#1a1a1a", // Dark gray
            "accent": "#333333", // Slightly lighter gray
            "neutral": "#242424", // Background color
            "base-100": "#000000", // Deep black background
            "info": "#3b82f6", // Blue
            "success": "#16a34a", // Green
            "warning": "#facc15", // Yellow
            "error": "#dc2626", // Red
          },
        },
        "dark", // Include DaisyUI's default dark theme
      ],
    },
  };
  

