import axios from 'axios';
import { AppThunk } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICountry, ICountryState } from "./models";


const initialState: ICountryState = {
	data: [],
	coutryFilter: [],
	regionFilter: [],
	loading: false,
	error: ""
}

const countriesSlice = createSlice({
	name: "COUNTRIES",
	initialState,
	reducers: {
		setLoading: (state, { payload }: PayloadAction<boolean>) => {
			state.loading = payload;
		},
		fetchCountriesDataSuccess: (state, { payload }: PayloadAction<ICountry[]>) => {
			state.loading = false
			state.data = payload;
		},
		fetchCountriesDataError: (state, { payload }: PayloadAction<string>) => {
			state.loading = false
			state.error = payload
		},
		sortByAlphabet: (state, { payload }: PayloadAction<boolean>) => {
			if (payload) {
				state.data = state.data.sort((a, b) => (a.name > b.name ? 1 : -1))
			} else {
				state.data = state.data.sort((a, b) => (a.name > b.name ? -1 : 1))
			}
		},
		filterDataFromArea: (state, { payload }: PayloadAction<number>) => {
			state.data = state.data.filter(item => item.area < payload)
		},
		filterDataFromRegion: (state, { payload }: PayloadAction<string>) => {
			state.data = state.data.filter(item => item.region === payload)
		},

	}
});

export const fetchCountries = (): AppThunk => {
	return async (dispatch) => {
		dispatch(setLoading(true))
		try {
			const res = await axios("https://restcountries.com/v2/all?fields=name,region,area");
			const data = res?.data;
			dispatch(fetchCountriesDataSuccess(data));
		} catch (error: any) {
			setLoading(false);
			dispatch(fetchCountriesDataError("Something goes wrong"))
		}
	}

}

export const {
	setLoading,
	fetchCountriesDataSuccess,
	fetchCountriesDataError,
	sortByAlphabet,
	filterDataFromArea,
	filterDataFromRegion,
} = countriesSlice.actions;

export default countriesSlice.reducer;

export const marketplaceSelector = (state: ICountryState) => state;

