import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://app.phasetwo.io/auth/',
  realm: 'ant-design-test',
  clientId: 'ant-design-test',
});

export default keycloak;
