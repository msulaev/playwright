import fetch from 'node-fetch';

export const getLoginToken = async () => {
   const responce = await fetch("https://localhost:2221/api/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({"username":"admin","password":"12345678"}), 
   });
   if (responce.status !== 200){
       throw new Error("Invalid status code");
   }

   const body = await responce.json();
   return body.token;
}