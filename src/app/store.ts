import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { authenticationApi } from "../components/login/common/authentication-api";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import { userReducer } from "../pages/Employees/common/user-slice";
import { dashboardApi } from "../pages/Dashboard/common/dashboard-api";
import { usersApi } from "../pages/Employees/common/users-api";
import { leavesApi } from "../pages/Leaves/common/leaves-api";
import { teamsApi } from "../pages/Teams/common/teams-api";
import { taskApi } from "../pages/Tasks/common/tasks-api";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUser = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUser,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [leavesApi.reducerPath]: leavesApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authenticationApi.middleware,
      dashboardApi.middleware,
      usersApi.middleware,
      leavesApi.middleware,
      teamsApi.middleware,
      taskApi.middleware
    );
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
