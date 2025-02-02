// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: ["~/plugins/vee-validate"],

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@vee-validate/nuxt",
    "nuxt-multi-tenancy",
    "dayjs-nuxt",
    "nuxt-gtag",
  ],

  routeRules: {
    "/": {
      swr: 300,
      cache: {
        varies: ["host"],
      },
    },
    "/jobs/**": { swr: 300 },
    "/forums/**": { swr: 300 },
    "/devfeeds/**": { swr: 300 },
    "/thread/**": {
      swr: 300,
      cache: {
        varies: ["host"],
      },
    },
    "/user/my-posts": {
      ssr: false,
    },
  },

  devServer: {
    port: 8080,
  },

  devtools: { enabled: true },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      publizApiUrl: process.env.VITE_PUBLIZ_API_URL,
    },
  },

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },

  multiTenancy: {
    tenantDynamicRoute: "organization",
    rootDomains: ["techgoda.local", "techgoda.net"],
    customDomains: {},
  },

  gtag: {
    enabled: !!process.env.NUXT_PUBLIC_GTAG_ID,
    id: process.env.NUXT_PUBLIC_GTAG_ID,
    tags: [],
  },

  compatibilityDate: "2025-02-02",
});
