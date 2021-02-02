let accessToken;
const clientId = ''; //Removed clientId
const redirectUri = 'http://localhost:3000/';


const Spotify = {
    getAccessToken(term) {

        if(accessToken){
            return accessToken;
        } 
        
        //check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        
        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            console.log(accessToken, expiresIn);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return accessToken
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }

    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        //replaces spaces
        let newTerm = term.replace(' ', '+');
        //console.log(newTerm);
        return fetch(`https://api.spotify.com/v1/search?q=${newTerm}&type=track`, { 
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            //console.log('Search Response: ', response);
            return response.json();
        }).then(jsonResponse => {
            //console.log('Json Search Response', jsonResponse);

            if (!jsonResponse.tracks) {
                //console.log('Error: no tracks returned');
                return [];
            }
            //console.log('Tracks obtained');
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                previewUrl: track.preview_url
            }));
        });
    },

    savePlaylist(playlistName, trackUris) {
        if(!playlistName || !trackUris.length){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;
        
        //retrieves the user's ID
        return fetch(`https://api.spotify.com/v1/me`, { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            console.log('UserId obtained', userId, jsonResponse);

            //creates playlist
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName}) 
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                console.log('Playlist obtained', playlistId, jsonResponse);

                //add tracks to playlist 
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris})
                });
                
            });
        });
    }

}

export default Spotify;