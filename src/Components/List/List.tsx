import { useEffect, useState } from "react";
import ListItem from "../ListItem/ListItem";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import classes from "./List.module.css";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchCountries, sortByAlphabet } from "../../Redux/Countries/countriesSlice";
import Spinner from "../Spinner/Spinner";
import Filter from "../Filter/Filter";
const List = () => {

	const [end, setEnd] = useState<number>(20);
	const [activeSort, setActiveSort] = useState<boolean>(false)
	const dispatch = useAppDispatch();
	const { data, loading, error } = useAppSelector(state => state.countries);

	useEffect(() => {
		dispatch(fetchCountries());
	}, [dispatch]);

	const sort = () => {

		setActiveSort(!activeSort)
		dispatch(sortByAlphabet(activeSort));
	}

	if (loading) return <Spinner />
	if (error) return <h1 style={{ textAlign: "center" }}>{error}</h1>

	return (
		<>
			<Filter />
			<div className={classes.List}>
				<div className={classes.Header}>
					<span>
						Name &nbsp;
						<SortByAlphaIcon
							fontSize="small"
							color={activeSort ? "warning" : "success"}
							sx={{ cursor: "pointer" }}
							onClick={sort}
						/>
					</span>
					<span>Region</span>
					<span>Area Size</span>
				</div>
				{data?.slice(0, end).map(({ name, region, area }, index) => {
					return <ListItem key={index} name={name} region={region} area={area} index={index + 1} />
				})}
				<div className={classes.Pagination}>
					<button onClick={() => setEnd(end + 20)}>View More</button>
				</div>
			</div>
		</>
	)
};
export default List;