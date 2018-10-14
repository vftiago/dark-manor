declare global {
    interface Window {
        gapi: any;
    }
}

// vendor imports
import * as React from "react";
import { css } from "emotion";

// local imports
import { Content } from "./components/Content/Content";
import { Menu } from "./components/Menu/Menu";
import api from "./api/api";
import { DEFAULTS } from "./defaults";

// types
import { Page, Proverb, Options, View } from "./types/types";

interface State {
    id: number;
    list: Proverb[];
    loading: boolean;
    proverbList: Proverb[];
    currentPage: Page;
    lang: string;
    allFetched: boolean;
    user?: any;
    errorMessage?: string;
}

const root = css`
    font-family: "Roboto Condensed";
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export class App extends React.Component<{}, State> {
    state: State = {
        id: DEFAULTS.id,
        list: [],
        proverbList: [],
        loading: true,
        currentPage: Page.LoadingPage,
        lang: DEFAULTS.lang,
        allFetched: false
    };

    async update(options: Options) {
        let proverbList = [];
        let id = options.id;
        const { loading } = this.state;

        if (!loading) {
            this.setState({
                loading: true
            });
        }
        switch (options.view) {
            case View.List:
                proverbList = await api.fetchList(this.state.lang);
                break;
            case View.Item:
                proverbList = await api.fetchItem(this.state.lang, id);
                break;
            default:
                return false;
        }

        this.setState({
            id,
            proverbList,
            loading: false
        });
    }

    onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        if (!this.state.allFetched) {
            this.fetchAll(term);
        } else {
            this.filterList(term);
        }
    };

    onGoogleResponse = async (response: any) => {
        const { tokenId } = response;
        const user = await api.fetchUser(tokenId);
        this.setState({ user });
    };

    filterList = (term: string) => {
        const proverbList = this.state.list.filter(
            item => item.text.toLowerCase().search(term) !== -1
        );
        this.setState({ proverbList });
    };

    fetchAll = async (term: string) => {
        const list = await api.fetchList(this.state.lang);
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
        try {
            const proverbList = await api.fetchList(this.state.lang);

            this.setState({
                currentPage: Page.ContentPage,
                proverbList,
                loading: false
            });
        } catch (errorMessage) {
            this.setState({
                currentPage: Page.ErrorPage,
                errorMessage,
                loading: false
            });
        }
    }

    render() {
        const { loading, errorMessage, currentPage, proverbList } = this.state;

        return (
            <div className={root}>
                <Menu
                    id={this.state.id}
                    onNavigation={this.onNavigation}
                    onSearch={this.onSearch}
                    onGoogleResponse={this.onGoogleResponse}
                    user={this.state.user}
                />
                <Content
                    loading={loading}
                    currentPage={currentPage}
                    errorMessage={errorMessage}
                    list={proverbList}
                    onNavigation={this.onNavigation}
                    onSearch={this.onSearch}
                />
            </div>
        );
    }
}
