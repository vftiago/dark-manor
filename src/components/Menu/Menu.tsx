// vendor
import * as React from "react";
import { css } from "emotion";
// local
import ShuffleIcon from "../Icons/ShuffleIcon";
import GridIcon from "../Icons/GridIcon";
import LeftIcon from "../Icons/LeftIcon";
import RightIcon from "../Icons/RightIcon";
import { Options, View } from "../../types";

const verticalCenter = css`
    display: flex;
    align-items: center;
`;

const menu = css`
    ${verticalCenter};
    color: white;
    background-color: #222222;
    font-family: "Roboto Condensed";
    padding: 10px;
    h1 {
        font-size: 18px;
        margin-right: 24px;
        user-select: none;
    }
    ul {
        list-style: none;
        ${verticalCenter};
        li {
            cursor: pointer;
            ${verticalCenter};
            padding: 0 12px;
            span {
                padding: 0 12px;
                font-size: 18px;
            }
        }
    }
`;

export interface MenuProps {
    id: number;
    onNavigation: (options: Options) => void;
}

export class Menu extends React.Component<MenuProps> {
    render() {
        return (
            <div className={menu}>
                <h1>Proverbial</h1>
                <ul>
                    <li
                        onClick={() =>
                            this.props.onNavigation({ view: View.List })
                        }
                    >
                        <GridIcon size={28} fill={"white"} />
                    </li>
                    <li
                        onClick={() =>
                            this.props.onNavigation({
                                view: View.Item,
                                random: true
                            })
                        }
                    >
                        <ShuffleIcon size={28} fill={"white"} />
                    </li>
                </ul>
            </div>
        );
    }
}
