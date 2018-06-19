import FetchData from './fetch-data';

const goodsList = new FetchData().get('goodsList').then(res => res);

export default goodsList;
