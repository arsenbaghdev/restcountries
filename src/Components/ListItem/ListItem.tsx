import classes from "./ListItem.module.css";


interface IListItemProps {
	name: string;
	area: number;
	region: string;
	index?: number;
}

const ListItem = ({ name, region, area, index }: IListItemProps) => {


	return (
		<div className={classes.Item}>
			<span>
				<b>{index}-</b> {name}
			</span>
			<span>
				{region}
			</span>
			<span>
				{area}
			</span>
		</div>
	)
};

export default ListItem;