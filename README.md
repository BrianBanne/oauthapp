DOCUMENTATION 


Server



express - lage en web server som hører "listen" etter requests 
axios - en "promise" (JS) basert klient som lager HTTP requests 
utils - funksjoner og andre kall hvor ulik info blir konfigurert

.env 
CLIENT_APP_ID= "304431094391-9ekht8neot4hlojs91t15hcck98dv5d7.apps.googleusercontent.com"
CLIENT_APP_SECRET= "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"
REDIRECT_URI= "/api/callback"


how it works 

send en request om authorization
Er informasjonen (token) du har gyldig? sjekker opp mot egne server og secret info. 
Sjekker om du er den du sier du er.
request_get_auth_code_url

Hvis gyldig gå videre til tilgang (access) 
gir deg tilgang til ulike ressurser. 
Starter med å sjekke hva du prøver å få tilgang til (request.query)

  auth_server_response: {
    code: '4/0AdQt8qhd93LpSZNvdCd8gMIEvq-CVTeQyGllX-WsYAyJglnBl07J-LpVmpO7JGqaMjaJ2A',
    scope: 'email profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile',
    authuser: '0',
    prompt: 'none'


Dette er infoen vil har requested fra scope ('profile', 'email', 'openid') tidligere. 
Har vi tilgang til denne infoen? 
Det sjekker vi med å hente en access token med authorization token vi nettopp så på (auth_server_response).
Her trenger vi secretene gitt av 3rd party (google). 
Så poster vi en url med tilgangs (access) token tilstedet. 

responsen fra url'en vil nå ha access token. 

hente bruker info med hjelp fra access token 

videre respons kan da bli sendt til whatever.



server.js
app.get('/auth', async (req, res) => { ....

redirecter webadressen til en funksjon fra utils filen. 
utils.request_get_auth_code_url =  `${google_auth_token_endpoint}?${query_string.stringify (auth_token_params)}&scope=${scopes.join (' ')}`;

google_auth_token... = https://accounts.google.com/o/oauth2/v2/auth
standard definert auth side fra 3rd party tjener. 

request_get_auth_code_url = google authorization token endpoint + informasjonen vi vil ha sendt som et query til auth token endpoint + hvilken info vi vil ha (scope)