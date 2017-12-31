let  accessToken ='';
const clientId = 'xxxx--need-to-get-this-on-spotify-xxxx';
const redirectURI = 'http://amcaniff-linux1:3000/';

const Spotify = {

   getAccessToken () {
      if(accessToken) {
            return new Promise( resolve => resolve(accessToken));
      } 
      console.log ('Got here');
      let innerToken =  window.location.href.match(/access_token=([^&]*)/);
      let expires = window.location.href.match(/expires_in=([^&]*)/);
      if (innerToken && expires) {
                  accessToken = innerToken.toString().replace("access_token=", "");
                  console.log (`setting access token to ${accessToken}`);
                  console.log (`innerToken is ${innerToken}`);
                  console.log (`expires is ${expires}`);
                  expires = expires.toString().replace("expires_in=","");
                  expires = expires.toString().replace(/,.*/, "");
                  console.log (`expires after transform is ${expires}`);
                  window.setTimeout(() => accessToken = '', expires * 1000);
                  /*window.history.pushState('Access Token', null, '/');*/
                  window.setTimeout(() => window.history.pushState('Access Token', null, '/'), expires * 1000);
                  return new Promise( resolve => resolve(accessToken));
                  /*return accessToken;*/
        } else {
                 var myUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
                 console.log (`my url is ${myUrl}`);
                 window.location.href = myUrl;
                 return;
        }
  },

  search (searchTerm) {
    return Spotify.getAccessToken().then( () => {
       console.log(`Hey and this is AT:  ${accessToken}`);
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
           {headers: { Authorization: `Bearer ${accessToken}` }});
    }).then(response => {
                  return response.json(); }).then( jsonResponse => {
      if (jsonResponse.tracks.items ) {
          return jsonResponse.tracks.items.map( item => {
            return {
                          id: item.id,
                          name: item.name,
                          artist: item.artists[0].name,
                          album: item.album.name,
                          uri:  item.uri,
                        };
          });
      }
    } )
 },

  savePlaylist(playName,tracks) {
     if (!playName) {console.log ('woops no playName');  return; }
     if (!tracks || !tracks.toString().match("spotify:track:")) {console.log ('woops no spotify tracks in the array'); return; }
     return Spotify.getAccessToken().then( () => {
        let header = { Authorization: `Bearer ${accessToken}` };
        return fetch(`https://api.spotify.com/v1/me`,
        {headers:  header})
      }).then( response => {
                  return response.json(); }).then( jsonResponse => {
      if (jsonResponse.id ) {
           let userId = jsonResponse.id;
           console.log(`here is my new userId and we are staying here: ${userId}`);
           let playUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
           console.log(`here is playUrl: ${playUrl}`);
           let myPlayheader = { Authorization: `Bearer ${accessToken}`,
                                "Content-Type": "application/json" };
           /*console.log(`here is playheader*/ 
           let myData = JSON.stringify({
                name: playName,
                public: true
           });
           let fetchData = {
                    method: 'POST',
                    body: myData,
                    headers: myPlayheader
           }

           fetch(playUrl, fetchData)
              .then( response => {
                  return response.json(); }).then( jsonResponse => {
               if (jsonResponse.id ) {
                  let playlistId = jsonResponse.id;
                  console.log (`Weve made it in here with playlistid ${playlistId}`);
                  console.log (`Is this the right list of uris ${tracks.slice()}`);
                  let myUriList = tracks.slice();
                  myUriList = myUriList.toString().replace(/:/g,"%3A");
                  console.log (`uri list after transform: ${myUriList}`);
                  let myListUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks?uris=${myUriList}`;
                  console.log (`this is my target URL: ${myListUrl}`);
                 let myPlayheader2 = { Authorization: `Bearer ${accessToken}`,
                                       "Content-Type": "application/json" };

                 let fetchData2 = {
                    method: 'POST',
                    headers: myPlayheader2
                 }
                 fetch(myListUrl, fetchData2)
                    .then(function() {
                        console.log ('Weve made it in here. Playlist saved');
                        return;
                    });
                  return;
           }
           return;
      })

    }} )
 }

}

export default Spotify; 
