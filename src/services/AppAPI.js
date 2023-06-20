import axios from 'axios';
import ConfigUrl from './ConfigUrl';

var activeUrl = ConfigUrl.getActiveConfigUrl();

var urlGetVideos = activeUrl + '/movies';

const HulAppsTestApi = {
    getVideos: () => {
        var requestUrl = `${urlGetVideos}`;

        return axios.get(requestUrl)
            .then(res => res)
            .catch(err => err);
    },
};

export default HulAppsTestApi;