/**
 * As convention, src/app.tsx is the place you will put the UmiJS runtime-config.
 * https://umijs.org/docs/runtime-config#rootcontainerlastrootcontainer
 */

import React from 'react';
import { KeycloakProvider } from '@react-keycloak/web';
import { KeycloakInitOptions } from 'keycloak-js';
// import { PageLoading } from './components/PageLoading';
import { PageLoading } from '@ant-design/pro-layout';
import keycloak from './keycloak';

const initConfig: KeycloakInitOptions = {
  onLoad: 'login-required',
  // onLoad: 'check-sso',
};

function onKeycloakEvent(event, error) {
  console.log('onKeycloakEvent', event, error);
}

function onKeycloakTokens(tokens) {
  console.log('onKeycloakTokens', tokens);
}

/**
 * Modify root component being passed to react-dom.
 * @param container The child container
 */
export function rootContainer(container) {
  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={initConfig}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
      LoadingComponent={<PageLoading />}
    >
      {container}
    </KeycloakProvider>
  );
}
