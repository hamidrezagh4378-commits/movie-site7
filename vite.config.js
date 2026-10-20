import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Preview-only host allowlist: the sandbox proxy sends an unpredictable
// sandbox hostname, so allow the wildcard sandbox domain + public origin.
// With BASE44_PREVIEW_MODE unset this stays undefined (vite default behavior).
const isPreview = process.env.BASE44_PREVIEW_MODE === '1';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: isPreview
      ? [
          `.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`,
          `3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`,
        ].filter(Boolean)
      : undefined,
  },
});
