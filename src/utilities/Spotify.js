let access_token = '';
const spotify_redirect_uri = "http://localhost:3000";
const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

const Spotify = {
  getAccessToken: () => {
    let url = window.location.href;
    let currentAccessToken = url.match(/access_token=([^&]*)/);
    let currentExpiresIn = url.match(/expires_in=([^&]*)/);
    if(access_token){
      return access_token;
    }
    else if(currentAccessToken && currentExpiresIn){
      access_token = currentAccessToken[1];
      let expires_in = currentExpiresIn[1];
      window.setTimeout(() => access_token = '', expires_in * 1000);
      window.history.pushState('Access Token', null, '/');
      return access_token;
    }
    else{
      const spotify_authorize_url = 'https://accounts.spotify.com/authorize';
      const endPoint = `${spotify_authorize_url}?client_id=${spotify_client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${spotify_redirect_uri}`;
      window.location = endPoint;
    }
  },
  search: (terms) => {
    Spotify.getAccessToken();
    const spotify_search_url = `https://api.spotify.com/v1/search?type=track&q=${terms}`;
    return fetch(spotify_search_url, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      //console.log(jsonResponse);
      return jsonResponse.tracks.items.map(track => {
        //console.log(track);
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }
      })
    })
  }
};


export default Spotify;