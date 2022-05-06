import classes from "./Spinner.module.css";
import { CircularProgress } from "@mui/material"


const Spinner = () => {

	return (
		<div className={classes.Spinner}>
			<CircularProgress />
		</div>
	)
};

export default Spinner;