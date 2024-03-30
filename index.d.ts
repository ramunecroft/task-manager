/// <reference types="cypress" />

import type LoginInfo from "@/cypress/fixtures/loginInfo.json";

interface FixtureTypes {
  loginInfo: typeof LoginInfo;
}

declare global {
  namespace Cypress {
    interface Chainable {
      fixture<K extends keyof FixtureTypes>(fixtureName: K): Chainable<FixtureTypes[K]>;
    }
  }
}
