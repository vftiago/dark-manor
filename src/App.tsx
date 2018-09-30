declare global {
    interface Window {
        gapi: any;
    }
}

// vendor imports
import * as React from "react";
import { css } from "emotion";
import Snackbar from "@material-ui/core/Snackbar";

// local imports
import { Content } from "./components/Content/Content";
import { Menu } from "./components/Menu/Menu";
import api from "./api/api";
import { DEFAULTS } from "./defaults";

// types
import { Proverb, Options, View } from "./types/types";

interface State {
    count: number;
    id?: number;
    list?: Proverb[];
    filteredList: Proverb[];
    lang: string;
    ready: boolean;
    allFetched: boolean;
}

const root = css`
    font-family: Quando;
    min-height: 100%;
    min-width: 500px;
    display: flex;
    flex-direction: column;
`;

export class App extends React.Component<{}, State> {
    state: State = {
        count: 0,
        id: 0,
        list: [],
        filteredList: [],
        lang: DEFAULTS.lang,
        ready: false,
        allFetched: false
    };

    api = api;

    async update(options: Options) {
        let filteredList = [];
        let id = options.id;
        let count =
            this.state.count || (await this.api.fetchCount(this.state.lang));

        switch (options.view) {
            case View.List:
                filteredList = await this.api.fetchList(this.state.lang);
                break;
            case View.Item:
                filteredList = await this.api.fetchItem(this.state.lang, id);
                break;
            default:
                return false;
        }

        this.setState({
            id,
            count,
            filteredList
        });

        console.log(this.state);
    }

    onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        if (
            !this.state.allFetched &&
            this.state.list.length < this.state.count
        ) {
            this.fetchAll(term);
        } else {
            this.filterList(term);
        }
    };

    onSignIn = async () => {
        await this.api.fetchUser();
    };

    filterList = (term: string) => {
        const filteredList = this.state.list.filter(
            item => item.text.toLowerCase().search(term) !== -1
        );
        this.setState({ filteredList });
    };

    fetchAll = async (term: string) => {
        const list = await this.api.fetchList(
            this.state.lang,
            this.state.count
        );
        this.setState({ list, allFetched: true });
        this.filterList(term);
    };

    onNavigation = (options: Options) => {
        if (options.id && this.state.id === options.id) {
            return false;
        }
        this.update(options);
    };

    async componentDidMount() {
        await this.update(DEFAULTS);
        this.setState({ ready: true });
    }

    render() {
        return (
            this.state.ready && (
                <div className={root}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                        open={true}
                        autoHideDuration={6000}
                        message={<span>Loading...</span>}
                    />
                    <Menu
                        id={this.state.id}
                        onNavigation={this.onNavigation}
                        onSearch={this.onSearch}
                        onSignIn={this.onSignIn}
                    />
                    <Content
                        list={this.state.filteredList}
                        onNavigation={this.onNavigation}
                        onSearch={this.onSearch}
                    />
                </div>
            )
        );
    }
}
