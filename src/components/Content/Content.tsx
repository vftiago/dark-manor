// vendor imports
import * as React from "react";
import { css } from "emotion";
import { AxiosInstance } from "axios";
// local imports
import { Item } from "./Item/Item";
import { List } from "./List/List";
// types
import { Proverb, View } from "../../types";

interface ContentProps {
	id: number;
	count: number;
	view: View;
	lang: string;
	list: Proverb[];
	text: string;
	onSearch: () => void;
	onViewSwitch: (view: View, id?: number) => void;
}

const content = css`
	background-color: #222;
	color: #ffd;
	text-shadow: 0 1px 1px black;
	display: flex;
	flex: 1 0 auto;
`;

export class Content extends React.Component<ContentProps> {
	render() {
		return (
			<div className={content}>
				{this.props.view === View.Item ? (
					<Item
						text={this.props.text}
						onViewSwitch={this.props.onViewSwitch}
					/>
				) : (
					<List
						onSearch={this.props.onSearch}
						lang={this.props.lang}
						list={this.props.list}
						count={this.props.count}
						onViewSwitch={this.props.onViewSwitch}
					/>
				)}
			</div>
		);
	}
}
