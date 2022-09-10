import axios from "axios";
import io from "socket.io-client";

const getApiBaseUrl = (defaultPort: number) => {
	if (!process.env.REACT_APP_DOMAIN) {
		return `http://${window.location.hostname}:${defaultPort}`;
	}

	return process.env.REACT_APP_DOMAIN;
};

const get = (url: string) => {
	return axios.get(`${getApiBaseUrl(3005)}/api${url}`);
};

const post = (url: string, data: any | undefined) => {
	return axios.post(`${getApiBaseUrl(3005)}/api${url}`, data);
};

const ws = () => {
	return io(`${getApiBaseUrl(3001)}/`); // todo: add some token to url?
};

export { get, post, ws };
