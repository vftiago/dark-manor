// vendor
import * as React from "react";
import { css } from "emotion";
// local
import ShuffleIcon from "../Icons/ShuffleIcon";
import GridIcon from "../Icons/GridIcon";

const menu = css`
	padding: 4px 24px;
	display: flex;
	align-items: center;
	h1 {
		font-size: 24px;
		padding: 0 12px;
	}
	ul {
		display: flex;
		align-items: center;
		list-style: none;
		padding: 0;
		margin: 0;
		li {
			padding: 0 12px;
		}
	}
`;

export interface MenuProps {}

export class Menu extends React.Component<MenuProps> {
	render() {
		return (
			<div className={menu}>
				<h1>Proverbial</h1>
				<ul>
					<li>
						<ShuffleIcon />
					</li>
					<li>
						<GridIcon />
					</li>
				</ul>
			</div>
		);
	}
}
