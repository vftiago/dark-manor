// vendor
import * as React from "react";
import { css } from "emotion";
// local
import ShuffleIcon from "../Icons/ShuffleIcon";
import GridIcon from "../Icons/GridIcon";
import LeftIcon from "../Icons/LeftIcon";
import RightIcon from "../Icons/RightIcon";
import GoogleIcon from "../Icons/GoogleIcon";
import { MenuButton } from "./MenuButton";
import { Options, View } from "../../types";
import { FilterBar } from "./FilterBar";

const verticalCenter = css`
    display: flex;
    align-items: center;
`;

const menuStyle = css`
    ${verticalCenter};
    background-color: #333;
    font-family: "Roboto Condensed";
    padding: 12px 0;
    justify-content: space-between;
    h1 {
        color: white;
        font-size: 18px;
        user-select: none;
        font-weight: 500;
    }
    ul {
        list-style: none;
        display: flex;
        ${verticalCenter};
        li {
            padding: 0 10px;
            ${verticalCenter};
            cursor: pointer;
        }
    }
`;

const leftSideMenu = css``;

const rightSideMenu = css`
    align-self: flex-end;
`;

const menuButtonStyle = css`
    cursor: pointer;
    border-radius: 3px;
    font-size: 14px;
    font-family: "Roboto";
    padding-right: 12px;
    background-color: white;
    color: black;
    height: 32px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    span {
        margin-left: 12px;
    }
    svg {
        position: relative;
        left: -4px;
    }
`;

const googleSignInTextStyle = css`
    color: rgba(0, 0, 0, 0.54);
`;

const rightItemStyle = css`
    align-self: flex-end;
`;

export interface MenuProps {
    id: number;
    onNavigation: (options: Options) => void;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSignIn: () => void;
}

export class Menu extends React.Component<MenuProps> {
    render() {
        return (
            <div className={menuStyle}>
                <ul className={leftSideMenu}>
                    <li>
                        <h1>Proverbial</h1>
                    </li>
                    <li>
                        <MenuButton
                            icon={<GridIcon fill={"#333333"} />}
                            label="Test"
                            onClick={() => {}}
                        />
                    </li>
                    <li
                        onClick={() =>
                            this.props.onNavigation({ view: View.List })
                        }
                    >
                        <div className={menuButtonStyle}>
                            <span>
                                <GridIcon size={26} fill={"#333333"} />
                            </span>
                            <p>List</p>
                        </div>
                    </li>
                    <li
                        onClick={() =>
                            this.props.onNavigation({
                                view: View.Item,
                                random: true
                            })
                        }
                    >
                        <div className={menuButtonStyle}>
                            <span>
                                <ShuffleIcon size={26} fill={"#333333"} />
                            </span>
                            <p>Random</p>
                        </div>
                    </li>
                    <li>
                        <FilterBar onSearch={this.props.onSearch} />
                    </li>
                </ul>
                <ul className={rightSideMenu}>
                    <li
                        onClick={() => this.props.onSignIn()}
                        className={rightItemStyle}
                    >
                        <div className={menuButtonStyle}>
                            <GoogleIcon />
                            <p className={googleSignInTextStyle}>
                                Sign in with Google
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
