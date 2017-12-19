const clientID =  'd35670ba65c84bfa89c7cbca215130b8';
const redirectURI = 'http://groovy-knot.surge.sh/';



let accessToken ;


const Spotify = {

  savePlaylist(name, trackURIs) {
       if (name != null || trackURIs.length > 0) {
         const accessToken = this.getAccessToken();
         const headers = { 'Authorization': 'Bearer ' + accessToken }
         let userID;

         JSON.get({
           url: 'https://api.spotify.com/v1/me',
           headers: headers
         }, response => {
           userID = response.id;
         }),
  search(term){
       const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    getAccessToken() {
      if (accessToken) {
        return accessToken;
      }

      const accessTokenValue = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      if (accessTokenValue && expiresInMatch) {
        accessToken = accessTokenValue[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = accessUrl;
      }
   }
 }
   export default Spotify;
