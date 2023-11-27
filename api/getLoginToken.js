import fetch from 'node-fetch';

export const getLoginToken = async (user, password) => {
   const responce = await fetch("https://localhost:2221/api/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({"username":user,"password":password}), 
   });
   if (responce.status !== 200){
       throw new Error("Invalid status code");
   }

   const body = await responce.json();
   return body.token;
}