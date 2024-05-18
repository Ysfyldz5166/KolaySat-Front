import axios from "axios";

  
  export function getUser(id){
    return axios.get(`/api/v1/users/${id}`)
  }