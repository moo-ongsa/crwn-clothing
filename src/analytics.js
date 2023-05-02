import Analytics from "analytics";
import googleTagManager from "@analytics/google-tag-manager";

const logger = {
  name: "logger",
  page: ({ payload }) => {
    console.log("page view fired", payload);
  },
  track: ({ payload }) => {
    console.log("tracker payload", payload);
  },
  // Custom functions to expose to analytics instance
};

export const tracker = Analytics({
  app: "wisible-app",
  plugins: [
    googleTagManager({
      containerId: "GTM-WLBTDBW",
    }),
    logger,
  ],
});
