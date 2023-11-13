import fetch from 'node-fetch';

export const getLoginToken = async () => {
   const responce = await fetch("https://www.saucedemo.com/api/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({"username":"admin","password":"12345678"}), 
   });
   const body = await responce.json();
   return body.token;
}