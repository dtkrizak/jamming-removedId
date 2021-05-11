# jamming-removedId

 The code allows a user to search for songs in Spotify and add them to a playlist which then saves to their account

 The majority of the project was focused in the /src folder
    App.js encapsulates all the components
    Playlist.js renders the playlist on the right hand side, passing information down to TrackList
    SearchBar.js renders the searchBar
    SearchResults.js renders the search results, passing information down to TrackList
    TrackList.js renders the list of tracks for either the search results or playlist, passing information down to Track
    Track.js renders the individual track, enabling playing and pausing the 30s preview available through Spotify
    in the /util folder, Spotify.js handles the Spotify API
    
 *Requires a clientId from Spotify to use, 
    which required creating an app through Spotify at https://developer.spotify.com/dashboard/applications
    more info available at https://developer.spotify.com/documentation/web-api/ 
    
