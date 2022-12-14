import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        pause(ms) {
          return new Promise((resolve) => {
            // tasks should not resolve with undefined
            setTimeout(() => resolve(null), ms);
          });
        },
      });
    },
  },
});
