import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Degular', sans-serif` },
        body: { value: `'Degular', sans-serif` },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
