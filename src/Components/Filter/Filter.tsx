import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { fetchCountries, filterDataFromArea, filterDataFromRegion } from "../../Redux/Countries/countriesSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import classes from "./Filter.module.css";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

interface FilmOptionType {
	name: string;
	region: string;

}
const Filter = () => {
	const dispatch = useAppDispatch()
	const { data } = useAppSelector(state => state.countries);
	const regions = data.filter((s => (o: any) => (k => !s.has(k) && s.add(k))
		(['region'].map(k => o[k]).join('|'))
	)
		(new Set())
	);

	const handleCountryChange = (event: React.SyntheticEvent, value: any, reason: string) => {
		if (!value?.name) return
		let getSize = data.filter((i) => i.name === value.name);
		dispatch(filterDataFromArea(getSize[0]?.area))
	}
	const handleRegionChange = (_event: React.SyntheticEvent, value: any, _reason: string) => {
		if (!value?.region) return
		console.log(value);
		let getRegion = data.filter((i) => i.region === value.region);
		dispatch(filterDataFromRegion(getRegion[0]?.region))
	}
	return (
		<div className={classes.Filter}>
			<label htmlFor="smaller">
				<span>Smaller than </span>
				<Stack spacing={1} sx={{ width: 200, margin: "0 10px", textAlign: "center !important" }}>
					<Autocomplete
						size="small"
						options={data}
						getOptionLabel={(option: FilmOptionType) => option.name}
						id="clear-on-blur"
						clearOnBlur
						renderInput={(params) => (
							<TextField {...params} label="Country" variant="standard" />
						)}
						onChange={(event, value, reason) => handleCountryChange(event, value, reason)}
					/>
				</Stack>
				<span> by area.</span>
			</label>
			<label htmlFor="smaller">
				<span>That are in </span>
				<Stack spacing={1} sx={{ width: 200, margin: "0 10px", textAlign: "center !important" }}>
					<Autocomplete
						size="small"
						options={regions}
						getOptionLabel={(option: FilmOptionType) => option.region}
						id="clear-on-blur"
						clearOnBlur
						renderInput={(params) => (
							<TextField {...params} label="Region" variant="standard" />
						)}
						onChange={(event, value, reason) => handleRegionChange(event, value, reason)}
					/>
				</Stack>
				<span> region. </span>
			</label>
			<Button
				color="warning"
				variant="outlined"
				onClick={() => dispatch(fetchCountries())} >Reset<RotateLeftIcon /></Button>
		</div >
	)
};

export default Filter;