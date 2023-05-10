import './App.css';
import  Routes  from './routes/Routes';
import axios from 'axios';
import jwt_decode from "jwt-decode";


axios.interceptors.request.use((request)=>{
     console.log("api call is going");
     request.headers['auth-token'] = sessionStorage.getItem('auth-token');
     if(!sessionStorage.getItem('auth-token')){
      return request;
     }
    const {exp} = jwt_decode(sessionStorage.getItem('auth-token'));
    const expDate = new Date(parseInt(exp)*1000);
    const currentDate = new Date();
    console.log(currentDate,expDate);
    if(currentDate > expDate){
      alert("trigger api");
    }
   
     return request;
},(error)=>{
  console.log(error);
  return Promise.reject(error);
})

function App() {
  return (
    <Routes/>
  );
}

export default App;
