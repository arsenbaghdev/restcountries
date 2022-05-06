import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import countriesSlice from "./Countries/countriesSlice";

export const store = configureStore({
	reducer: {
		countries: countriesSlice
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
