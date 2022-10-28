

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '204287806648-q79jg96urkhbd82pjjdoe87tlude5qar.apps.googleusercontent.com';
const API_KEY = 'AIzaSyC60_5G1wvVTys0x9Q-qPqD1TzETjcfaW4';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;


   
   


document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';
document.getElementById('execute').style.visibility = 'hidden';
document.getElementById('Guest').style.visibility = 'hidden';
document.getElementById('Guestbox').style.visibility = 'hidden';

document.getElementById('checkin').style.visibility = 'hidden';
document.getElementById('c_head').style.visibility = 'hidden';
document.getElementById('co_head').style.visibility = 'hidden';
document.getElementById('cal').style.visibility='hidden';

document.getElementById('checkout').style.visibility = 'hidden';



/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('checkin').style.visibility = 'visible';
    document.getElementById('checkout').style.visibility = 'visible';
    document.getElementById('c_head').style.visibility = 'visible';
    document.getElementById('co_head').style.visibility = 'visible';
    document.getElementById('Guest').style.visibility = 'visible';
    document.getElementById('Guestbox').style.visibility = 'visible';
    document.getElementById('cal').style.visibility='visible';

    document.getElementById('signout_button').style.visibility = 'visible';
     document.getElementById('execute').style.visibility = 'visible';
   // location.href = "./checkin.html";
     

    document.getElementById('authorize_button').innerText = 'Refresh';
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('content').innerText = '';
    document.getElementById('authorize_button').innerText = 'Authorize';
    document.getElementById('signout_button').style.visibility = 'hidden';
    document.getElementById('execute').style.visibility = 'hidden';

  }
}


function execute() {

   let date_cout = document.forms["form1"]["coutDate"].value;
   let date_cin = document.forms["form1"]["cinDate"].value;
   let g_name = document.forms["form1"]["gname"].value;

   let debug =  "\""+date_cin+"\""
   alert(debug)
return gapi.client.calendar.events.insert({
"calendarId": "loper2309@gmail.com",
"conferenceDataVersion": 1,
"maxAttendees": 10,
"sendNotifications": true,
"sendUpdates": "all",
"supportsAttachments": false,
"resource": {
  "end": {
    "date":`${date_cout}`
  },
  "start": {
    "date":`${date_cin}`
  },
    "description": `${g_name}`,
    "summary": `${g_name}`
  
 
}

})

  .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
        },
        function(err) { console.error("Execute error", err); });
}

