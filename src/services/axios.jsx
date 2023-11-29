import axios from "axios";

const BASE_API_URL="http://192.168.18.15:1337/api/"
const API_KEY="7014e182dd87b2c55c94c6af974380276f922c9ddffac8dc2ff7a7cb87bee8b47eb9b50e4d9c66c9f9fdc4605e044ed6e01639984dcbbb22283ab51e2f11c0f7608015a49d0762259f497d5cd5ac3650f915d1526349a2bbc08daeba1766ec019d5ff7ae5c75f9e87c999d91a4d4388b190ffb656198f3cec5e41ef0148672f7"

const AxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    headers:{
        'Authorization':"Bearer " + API_KEY
    }
})

const getSlider = () => AxiosInstance.get("/sliders?populate=*");

const getAuthorities = () => AxiosInstance.get("/authorities?populate=*");

const getMarkers = () => AxiosInstance.get("/markers?populate=*");

const getInfos = () => AxiosInstance.get("/infos?populate=*");

const getAlerts = () => AxiosInstance.get("/alerts?populate=*");

const postAlert = (request) => AxiosInstance.post("/alerts", request);

const postMarker = (request) => AxiosInstance.post("/markers", request);

const getNews = () => AxiosInstance.get("/news?populate=*");

const getOnboards = () => AxiosInstance.get("/onboards?populate=*");

export default{
    getSlider,
    getAuthorities,
    getMarkers,
    postMarker,
    getInfos,
    getAlerts,
    getOnboards,
    getNews,
    postAlert
}