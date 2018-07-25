import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-app-2b4fc.firebaseio.com/"
});

export default instance;
