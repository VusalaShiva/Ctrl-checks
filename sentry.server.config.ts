// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://23404168842f9774d963d61603efe4f7@o4510509263159296.ingest.de.sentry.io/4510509277773904",

  integrations: [
    // Add to Vercel AI SDK integration to sentry.server.config.ts 
    Sentry.vercelAIIntegration({
      recordInputs:true,
      recordOutputs:true,
    }),
    Sentry.consoleLoggingIntegration({
      levels: ["log", "warn", "error"] }),
  ],
  

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,


  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  debug :false,
});
