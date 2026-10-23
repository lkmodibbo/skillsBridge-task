import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import type { Storage } from 'redux-persist'

// Explicit localStorage adapter — avoids the redux-persist/lib/storage ESM resolution bug in Vite
const storage: Storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
}
import { authSlice } from './authSlice'
import { themeSlice } from './themeSlice'
import { authApi } from './api/authApi'
import { coursesApi } from './api/coursesApi'

const persistConfig = {
  key: 'skillbridge',
  storage,
  whitelist: ['auth', 'theme'], // only persist auth + theme
}

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  theme: themeSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [coursesApi.reducerPath]: coursesApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(coursesApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Barrel exports for convenience
export { setCredentials, clearCredentials, updateUser } from './authSlice'
export { toggleTheme, setTheme } from './themeSlice'
export {
  authApi,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMeQuery,
} from './api/authApi'
export {
  coursesApi,
  useGetCoursesQuery,
  useGetCourseQuery,
  useEnrollCourseMutation,
} from './api/coursesApi'
