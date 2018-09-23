import axios from "axios";
import { DEFAULTS } from "./../defaults";

const instance = axios.create({
    baseURL: "http://localhost:5000",
    // baseURL: "https://stark-plains-40227.herokuapp.com/",
    timeout: 5000
});

const api = {
    fetchUser: async () => {
        try {
            const response = await instance.get("auth/verify");
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    fetchCount: async (lang: string = DEFAULTS.lang) => {
        try {
            const response = await instance.get("api/counts", {
                params: { lang }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    fetchItem: async (lang: string = DEFAULTS.lang, id?: number | string) => {
        id = id || "random";

        const route = `api/proverbs/${id}`;

        try {
            const response = await instance.get(route, {
                params: { lang }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    fetchList: async (
        lang: string = DEFAULTS.lang,
        _limit: number = DEFAULTS.pageSize
    ) => {
        try {
            const response = await instance.get("api/proverbs", {
                params: { lang, _limit }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
};

export default api;
