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
      return jsonResponse.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }
      })
    })
  },
  savePlaylist: (playlistName, trackURIs) => {
    if(playlistName === '' && trackURIs.length < 1){
      console.log('Error: Empty Playlist or No Name');
      return;
    }
    Spotify.getAccessToken();

    fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      let user_id = jsonResponse.id;

      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: playlistName})

      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        let playlist_id = jsonResponse.id;

        return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({uris: trackURIs})
        });

      })
    })
  }
};


export default Spotify;