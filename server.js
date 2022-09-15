const express = require ('express');
const utils = require ('./utils');
const port=4000;
//sier seg selv vil jeg tro.
// port = 4000
// utils henter de eksporterte komponentene fra utils.js filen

const app = express();

/*
henter /auth webadressen, hvor req (request) og res (response) ++ mer er variabler man kan endre og modifisere på. 
Her skal vi kun authorize brukeren ved hjelp av google. siden vi kun skal sende data til 3rd party tjeneren (google) så trenger vi kun å sende (res) informasjon. 
res.redirect 
*/
app.get ('/auth', async (req, res) => {
    try {
    res.redirect(utils.request_get_auth_code_url);
    } catch (error) {
        res.sendStatus(500);
        console.log(error.message);
    }
 // res.send("auth route")
});

app.get (process.env.REDIRECT_URI, async (req, res) => {
    const authorization_token = req.query;
    console.log ({auth_server_response: authorization_token});
    try {
      // get access token using authorization token
      const response = await utils.get_access_token(authorization_token.code);

    // get access token from payload
      const {access_token} = response.data;
      
      // get user profile data
      const user = await utils.get_profile_data(access_token);
      const user_data = user.data;
      if(user_data.email_verified === true) {
        res.send (`
        <h1> welcome ${user_data.name}</h1>
        <img src="${user_data.picture}" alt="user_image" />
        <p> Email: ${user_data.email} </p>
      `);
      } else {
        res.send (`
        <h1> pls verify email</h1>
      
      `);
      }
     
      console.log (user_data);
    } catch (error) {
      console.log (error.message + " asdasd");
      res.sendStatus (500);
    }
  });


console.log("port number "+port);
app.listen(port);

