# Ant Design Pro with Keycloak Auth

This is a modified version of the basic [Ant Design Pro](https://pro.ant.design) template with the user authentication and authorization system replaced with [Keycloak](https://www.keycloak.org).

## Keycloak setup

Create a realm with a public OIDC client. Modify the `src/keycloak.ts` file with your url, realm and clientId. Create client roles for the authorities you intend to use in your application.

Ant Design Pro has an "Authority Management" feature that allows you to protect pages and effect menu and router permissions. Given the original template, those authorities were loaded from internal pages where a login or register triggered a call to an external service. Following modification, we still allow the developer to set authority rules in code as before (e.g. in config.ts for the routes), but the user's granted authorities now come from the Keycloak JWT (in the `resource_access` claim for the given client).

## Environment Prepare

Install `node_modules`:

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
yarn start
```

### Build project

```bash
yarn build
```

### Check code style

```bash
yarn lint
```

You can also use script to auto fix some lint error:

```bash
yarn lint:fix
```

### Test code

```bash
yarn test
```
