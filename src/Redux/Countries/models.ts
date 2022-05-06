export interface ICountry {
	name: string;
	region: string;
	area: number;
	independent: boolean;
}

export interface ICountryState {
	data: ICountry[];
	coutryFilter: ICountry[];
	regionFilter: ICountry[];
	loading: boolean;
	error: string;
}
