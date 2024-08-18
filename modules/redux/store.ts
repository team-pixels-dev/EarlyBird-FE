import { configureStore } from "@reduxjs/toolkit";
import RootReducer, { RootState } from "./root-reducer";
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger'

/**
 * 1. Redux-Persist에 설정 값을 구성합니다.
 */
const persistConfig: PersistConfig<RootState> = {
    key: 'root',                // 저장되는 값에 대한 식별자로 반드시 입력해주세요.
    storage: AsyncStorage,      // Redux가 저장되는 Storage로 AsyncStorage를 이용합니다.
    blacklist: [],              // 선택적으로 저장하지 않을 리듀서를 지정할 수 있습니다.
};

/**
 * 2. 애플리케이션의 '상태'를 관리하기 위한 Store 구성합니다.
 */
export const Store = configureStore({
    // Redux-Persist 설정값과 구성한 RootReducer를 통해 Reducer를 구성합니다.
    reducer: persistReducer(persistConfig, RootReducer)!,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
      {
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
          ignoredPaths: ['register'],
        },
      }
    )
      
    // 미들 웨어로 logger를 사용합니다.
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

/**
 * 3. 외부에서 사용할 수 있도록 persistor를 구성합니다.
 */
export const Persistor = persistStore(Store);

export type AppDispatch = typeof Store.dispatch