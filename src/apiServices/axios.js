import axios from "axios";
const instance = axios.create({
  baseURL: "https://relico-demo.herokuapp.com/api"
  //baseURL: "http://localhost:8080/api"
});
export default instance;