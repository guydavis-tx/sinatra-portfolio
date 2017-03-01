// Jukebox constructor
function Jukebox () {
	// array for songs in jukebox
	this.songs = [];
	// initalize current song to null
	this.currentSong = "";

	// Method to play a song
	this.play = function (song) {
		console.log('Made it to play('+song.id+')');
		// pause any song that's currently playing
		this.pause();
		// update the current song indicator to the new song
		this.currentSong = song;
		// update global variable used to set which song the play button plays
		songToPlay = song;
		console.log("SongToPlay object below");
		console.log(songToPlay);
		// log which song is starting and at what time index
		console.log("Starting: "+this.currentSong.songName+" at "+document.getElementById(this.currentSong.id).currentTime);
		//issue the play command for the audio file linked to song.id
		document.getElementById(song.id).play();
		// update the currently playing box information
		document.getElementById("current-song").innerHTML = song.songName;
		document.getElementById("artist").innerHTML = song.artist;
		document.getElementById('cover-art').src = song.coverArt;
	
		// document.getElementsByTagName('legend').innerText = song.songName;
		console.log('Leaving play('+song.id+')');

	}
	this.pause = function () {
		console.log('Made it to pause()');
		// Check if there is a current song
		if (this.currentSong!=""){
			// If not currently paused then pause
			if (!document.getElementById(this.currentSong.id).paused){
				document.getElementById(this.currentSong.id).pause();
				console.log("Pausing: "+this.currentSong.songName+" at "+document.getElementById(this.currentSong.id).currentTime);
				// Make sure current song is paused before leaving pause
			} else {
				console.log(this.currentSong.id+" already paused");
			}
		} else {
			console.log("No current song to pause");
		}
		// Log leaving function
		if (this.currentSong==""){
			console.log('Leaving pause()');
		} else {
			console.log('Leaving pause('+this.currentSong.id+')');
		}
	}

	// Method to stop a song from playing
	this.stop = function () {
		console.log('Made it to stop()');
		if(this.currentSong!=""){
			// pause the current song then set the time index to zero
			console.log("current Song to Stop: "+this.currentSong.id);
			this.pause();
			document.getElementById(this.currentSong.id).currentTime = 0;
			console.log("Stopped "+this.currentSong.id+"  Time index now: "+document.getElementById(this.currentSong.id).currentTime);
			console.log('Leaving stop('+this.currentSong.id+')');

		} else {
			console.log("Leaving stop(); No current song to stop");
		}
	}

	// Method to shuffle to another song
	this.shuffle = function () {
		console.log('Made it to shuffle()');
		// randomSongIndex = generate a random number from 0 to maximum songs array length
		var randomNumberIndex = Math.floor(Math.random() * (this.songs.length));
		console.log("Randomly selected song["+randomNumberIndex+"]");
		var randomSong = this.songs[randomNumberIndex];
		// extension: add check to make sure randomly chosen song is not current song playing
		console.log

		while (randomSong.id==this.currentSong.id) {
			console.log("Random song = Current song  --> try again")
			randomNumberIndex = Math.floor(Math.random() * (this.songs.length));
			console.log("Randomly selected song["+randomNumberIndex+"]");
			randomSong = this.songs[randomNumberIndex];
		}
		// stop current song:  pause then set time index=0
		if (this.currentSong!=""){
			console.log("this.currentSong != Null -- calling stop");
			this.stop();
		}
		// Play the new randomly selected song
		this.play(randomSong);
		console.log('Leaving shuffle()');
	}
	// Method to add a song to the jukebox queue
	this.addSong = function (song){
		this.songs.push(song);
	}
	this.increaseVolume = function () {
		if (this.currentSong!="") {
		document.getElementById(this.currentSong.id).volume+=0.1;
		}
	}
	this.decreaseVolume = function () {
		if (this.currentSong!="") {
			document.getElementById(this.currentSong.id).volume-=0.1;
		}
	}
}
// Constructor object for a song
function Song (id, songName, artist, coverArtUrl, sampleUrl, duration) {
	this.id = id;
	this.songName = songName;
	this.artist = artist;
	this.coverArt = coverArtUrl; // url of cover art
	this.sample = sampleUrl;  // url of sample track
	this.duration = duration;
}

function playSongWithReset(song){
	if (bob.currentSong!=""){
		bob.stop();
	}
	bob.play(song);
}

function playSong(song){
	bob.play(song);
}

function stopSong(){
	bob.stop();
}

function pauseSong(){
	bob.pause();
}

function increaseVolume() {
	bob.increaseVolume();
}

function decreaseVolume() {
	bob.decreaseVolume();
}

function shuffle() {
	bob.shuffle();
}


// Create some song objects
var hotelSong;
var heartbeatSong;
var jessieSong;
var rocketSong;
var your_loveSong;

// Create jukebox bob
var bob = new Jukebox();

// Create global variable to hold Spotify query responses
var spotifyResponse;

// Query spotify for Hotel California info by Eagles
$.ajax({
    method: "GET", 
    url: "https://api.spotify.com/v1/search",
    data: { 
        type: "track", 
        q: "Hotel California" 
    },
    success: function(response){  // This function will run
      spotifyResponse = response; // once you get a successful
      console.log(response)       // response from the API!

		  hotelSong = new Song(
				'hotel',
				"Hotel California", 
				spotifyResponse.tracks.items[0].artists[0].name, 
				spotifyResponse.tracks.items[0].album.images[0].url,
				spotifyResponse.tracks.items[0].preview_url,
				spotifyResponse.tracks.items[0].duration_ms
			);
			console.log('Creating song for: '+hotelSong.artist);
			bob.addSong(hotelSong);		 
    	console.log('Adding song to jukebox: '+hotelSong.songName);
    }
});
// Query Spotify for Heartbeat Song - Kelly Clarkson
$.ajax({
    method: "GET", 
    url: "https://api.spotify.com/v1/search",
    data: { 
        type: "track", 
        q: "Heartbeat Song" 
    },
    success: function(response){  // This function will run
      spotifyResponse = response; // once you get a successful
      console.log(response)       // response from the API!

		  heartbeatSong = new Song(
				'heartbeat',
				"Heartbeat Song", 
				spotifyResponse.tracks.items[0].artists[0].name, 
				spotifyResponse.tracks.items[0].album.images[0].url,
				spotifyResponse.tracks.items[0].preview_url,
				spotifyResponse.tracks.items[0].duration_ms
			);
			console.log('Creating song for: '+heartbeatSong.artist);
			bob.addSong(heartbeatSong);		 
    	console.log('Adding song to jukebox: '+heartbeatSong.songName);

    }
});
// Query Spotify for Jessie's Girl by Rick Springfield
$.ajax({
    method: "GET", 
    url: "https://api.spotify.com/v1/search",
    data: { 
        type: "track", 
        q: "Jessie\'s Girl" 
    },
    success: function(response){  // This function will run
      spotifyResponse = response; // once you get a successful
      console.log(response)       // response from the API!

		  jessieSong = new Song(
				'jessie',
				"Jessie\'s Girl", 
				spotifyResponse.tracks.items[0].artists[0].name, 
				spotifyResponse.tracks.items[0].album.images[0].url,
				spotifyResponse.tracks.items[0].preview_url,
				spotifyResponse.tracks.items[0].duration_ms
			);
    	console.log('Creating song for: '+jessieSong.artist);
			bob.addSong(jessieSong);		 
    	console.log('Adding song to jukebox: '+jessieSong.songName);
    }
});
// Query Spotify for Rocket Man by Elton John
$.ajax({
    method: "GET", 
    url: "https://api.spotify.com/v1/search",
    data: { 
        type: "track", 
        q: "Rocket Man" 
    },
    success: function(response){  // This function will run
      spotifyResponse = response; // once you get a successful
      console.log(response)       // response from the API!

      rocketSong = new Song(
				'rocket',
				"Rocket Man", 
				spotifyResponse.tracks.items[1].artists[0].name, 
				spotifyResponse.tracks.items[1].album.images[0].url,
				spotifyResponse.tracks.items[1].preview_url,
				spotifyResponse.tracks.items[1].duration_ms
			);
    	console.log('Creating song for: '+rocketSong.artist);
			bob.addSong(rocketSong);		 
    	console.log('Adding song to jukebox: '+rocketSong.songName);
    }
});
// Query Spotify for Your Love by The Outfield
$.ajax({
    method: "GET", 
    url: "https://api.spotify.com/v1/search",
    data: { 
        type: "track", 
        q: "Your Love" 
    },
    success: function(response){  // This function will run
      spotifyResponse = response; // once you get a successful
      console.log(response)       // response from the API!

		  your_loveSong = new Song(
				'your_love',
				"Your Love", 
				spotifyResponse.tracks.items[6].artists[0].name, 
				spotifyResponse.tracks.items[6].album.images[0].url,
				spotifyResponse.tracks.items[6].preview_url,
				spotifyResponse.tracks.items[6].duration_ms
			);
      console.log('Creating song for: '+your_loveSong.artist);
			bob.addSong(your_loveSong);		 
    	console.log('Adding song to jukebox: '+your_loveSong.songName+"by: "+your_loveSong.artist);
		}
});


$(document).ready(function() {
songToPlay = bob.songs[0];

// update screen labels with Song title
document.getElementById('hotelLabel').innerText = hotelSong.artist+": "+hotelSong.songName;
document.getElementById('heartbeatLabel').innerText = heartbeatSong.artist+": "+heartbeatSong.songName;
document.getElementById('rocketLabel').innerText = rocketSong.artist+": "+rocketSong.songName;
document.getElementById('your_loveLabel').innerText = your_loveSong.artist+": "+your_loveSong.songName;
document.getElementById('jessieLabel').innerText = jessieSong.artist+": "+jessieSong.songName;


});




