import Analytics from "analytics";
import googleTagManager from "@analytics/google-tag-manager";

export const tracker = Analytics({
  app: "wisible-app",
  plugins: [
    googleTagManager({
      containerId: "GTM-WLBTDBW",
    }),
  ],
});
