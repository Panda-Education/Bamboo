import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { flatRoutes } from 'remix-flat-routes';

export default defineConfig({
  plugins: [
    remix({
      // https://github.com/kiliman/remix-flat-routes
      ignoredRouteFiles: ['**/*'],
      routes: async defineRoutes => {
        return flatRoutes('routes', defineRoutes)
      },

      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),

    tsconfigPaths(),
  ],
});
