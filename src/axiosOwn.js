import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-93fdf.firebaseio.com/"
});

export default instance;
