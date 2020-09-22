import { Effect, Reducer } from 'umi';

// import { queryCurrent, query as queryUsers } from '@/services/user';
import { query as queryUsers } from '@/services/user';
import { KeycloakProfile } from 'keycloak-js';
import keycloak from '../keycloak';

// modified user to correspond to KeycloakProfile
export interface CurrentUser {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  enabled?: boolean;
  emailVerified?: boolean;
  createdTimestamp?: number;
  avatar?: string;
  attributes?: {
    key: string;
    label: string;
  }[];
}

/* original from ant design pro template
export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}
*/

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

async function loadCurrentUser(): Promise<CurrentUser> {
  return keycloak.loadUserProfile().then(function (profile: KeycloakProfile) {
    const t = keycloak.tokenParsed;
    const user: CurrentUser = {
      id: t.sub,
      username: t.preferred_username,
      email: t.email,
      firstName: t.given_name,
      lastName: t.family_name,
      enabled: profile.enabled,
      emailVerified: t.email_verified,
      createdTimestamp: profile.createdTimestamp,
    };
    return user;
  });
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      // const response = yield call(queryCurrent);
      const response = yield call(loadCurrentUser);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
