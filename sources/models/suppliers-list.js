import FetchData from './fetch-data';

const suppliersList = new FetchData().get('suppliers').then(res => res);

export default suppliersList;
