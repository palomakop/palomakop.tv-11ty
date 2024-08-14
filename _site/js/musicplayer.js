// HTML5 audio player + playlist controls
function MusicPlayer(document, id) {
	var musicPlayerElement = document.querySelector(`#${id}`);
	var jsPlayer = musicPlayerElement.querySelector('.player-wrap');
	this.wrap = jsPlayer;
	this.player = (jsPlayer.querySelector('audio') || { play: function () { }, pause: function () { } }),
	this.play = (jsPlayer.querySelector('.play') || {});
	this.pause = (jsPlayer.querySelector('.pause') || {});
	this.seek = (jsPlayer.querySelector('.seek') || {});
	this.prev = (jsPlayer.querySelector('.prev') || {});
	this.next = (jsPlayer.querySelector('.next') || {});
	this.button = (jsPlayer.querySelector('.button') || { style: {} });
	this.wrapList = (musicPlayerElement.querySelector('.playlist-wrap') || {});
	this.action = (jsPlayer.querySelector('.action') || {});
	this.title = (jsPlayer.querySelector('.title') || {});
	this.current = (jsPlayer.querySelector('.current') || {});
	this.duration = (jsPlayer.querySelector('.duration') || {});
	this.trackCount = 0;
	this.seeking = null;
	this.playing = false;
	this.tracks = [];
	this.track = [];
	this.idx = 0;

	function playClicked(myPlayer) {
		myPlayer.button.style.visibility = 'hidden';
		myPlayer.pause.style.display = 'block';
		myPlayer.play.style.display = 'none';
		myPlayer.playing = true;
		myPlayer.action.innerHTML = 'playing&hellip;';
		myPlayer.player.play();
		updateSeek(myPlayer);
	};
	function pauseClicked(myPlayer) {
		myPlayer.play.style.display = 'block';
		myPlayer.pause.style.display = 'none';
		clearTimeout(myPlayer.seeking);
		myPlayer.playing = false;
		myPlayer.action.innerHTML = 'paused&hellip;';
		myPlayer.player.pause();
	};
	function loadPlaylist(myPlayer) {
		myPlayer.playlist = myPlayer.wrapList ? myPlayer.wrapList.querySelectorAll('ol > li') : [];
		var len = myPlayer.playlist.length, tmp, i;
		for (i = 0; i < len; i++) {
			if (!myPlayer.playlist[i].dataset) {
				myPlayer.playlist[i].dataset = {};
			}
			tmp = myPlayer.playlist[i].querySelector('a');
			if (tmp && !myPlayer.playlist[i].dataset.idx) {
				myPlayer.playlist[i].dataset.idx = i + 1;
				myPlayer.trackCount++;
				myPlayer.tracks.push({
					"file": tmp.href,
					"name": (tmp.textContent || tmp.innerText).replace(/^\s+|\s+$/g, ''),
					"track": i + 1
				});
			}
		}
	};
	function loadTrack(myPlayer, idx) {
		var len = myPlayer.playlist.length, i;
		for (i = 0; i < len; i++) {
			if (myPlayer.playlist[i].classList) {
				if (i === idx) {
					myPlayer.playlist[i].classList.add('sel');
				} else {
					myPlayer.playlist[i].classList.remove('sel');
				}
			}
		}
		myPlayer.title.innerHTML = myPlayer.tracks[idx].name;
		myPlayer.player.src = myPlayer.tracks[idx].file;
		myPlayer.seek.value = 0;
		myPlayer.duration.innerHTML = "0:00";
		myPlayer.current.innerHTML = "0:00";
	};
	function playTrack(myPlayer, idx) {
		loadTrack(myPlayer, idx);
		myPlayer.playing = true;
		playClicked(myPlayer);
	};
	function setDuration(myPlayer) {
		myPlayer.duration.innerHTML = formatTime(myPlayer.player.duration);
		myPlayer.current.innerHTML = formatTime(myPlayer.player.currentTime);
		myPlayer.seek.value = myPlayer.player.currentTime / myPlayer.player.duration;
	};
	function updateSeek(myPlayer) {
		if (isNaN(myPlayer.player.duration)) {
			myPlayer.seek.value = 0;
		} else {
			myPlayer.seek.value = 100 * myPlayer.player.currentTime / myPlayer.player.duration;
		}
		myPlayer.current.innerHTML = formatTime(myPlayer.player.currentTime);
		if (myPlayer.playing) {
			myPlayer.seeking = setTimeout(updateSeek, 800, myPlayer);
		}
	};
	function formatTime(val) {
		var h = 0, m = 0, s;
		val = parseInt(val, 10);
		if (val > 60 * 60) {
			h = parseInt(val / (60 * 60), 10);
			val -= h * 60 * 60;
		}
		if (val > 60) {
			m = parseInt(val / 60, 10);
			val -= m * 60;
		}
		s = val;
		val = (h > 0) ? h + ':' : '';
		val += (m > 0) ? ((m < 10 && h > 0) ? '0' : '') + m + ':' : '0:';
		val += ((s < 10) ? '0' : '') + s;
		return val;
	};
	function init(myPlayer) {
		var track = (myPlayer.wrap && myPlayer.wrap.dataset && myPlayer.wrap.dataset.url) ? myPlayer.wrap : null, tmp, i;
		if (!!document.createElement('audio').canPlayType('audio/mpeg')) {
			if (myPlayer.wrapList && myPlayer.wrapList.querySelectorAll('ol > li').length > 0) {
				loadPlaylist(myPlayer);
			} else if (track) {
				myPlayer.tracks = [{
					"file": track.dataset.url,
					"name": (track.dataset.title || ''),
					"track": 1
				}];
			}
			if (myPlayer.tracks.length > 0) {
				if (myPlayer.player) {
					myPlayer.player.addEventListener('ended', function playerEnded() {
						if (myPlayer.idx + 1 < myPlayer.trackCount) {
							myPlayer.idx++;
							playTrack(myPlayer, myPlayer.idx);
						} else {
							myPlayer.action.innerHTML = 'paused&hellip;';
							myPlayer.player.pause();
							myPlayer.idx = 0;
							loadTrack(myPlayer, myPlayer.idx);
						}
					}, true);
					myPlayer.player.addEventListener('loadeddata', function playerLoadeddata() {
						setDuration(myPlayer);
					}, true);
				}
				if (myPlayer.play) {
					myPlayer.play.addEventListener('click', function playWasClicked(event) {
						event.preventDefault();
						playClicked(myPlayer);
					}, true);
				}
				if (myPlayer.pause) {
					myPlayer.pause.addEventListener('click', function pauseWasClicked(event) {
						event.preventDefault();
						pauseClicked(myPlayer);
					}, true);
				}
				if (myPlayer.button) {
					myPlayer.button.addEventListener('click', function buttonClicked(event){
						event.preventDefault();
						playClicked(myPlayer);
					}, true);
				}
				if (myPlayer.prev) {
					myPlayer.prev.addEventListener('click', function prevClicked(event) {
						event.preventDefault();
						if (myPlayer.idx - 1 > -1) {
							myPlayer.idx--;
							loadTrack(myPlayer, myPlayer.idx);
							if (myPlayer.playing) {
								myPlayer.action.innerHTML = 'playing&hellip;';
								myPlayer.player.play();
							}
						} else {
							myPlayer.action.innerHTML = 'paused&hellip;';
							myPlayer.playing = false;
							myPlayer.player.pause();
							myPlayer.idx = 0;
							loadTrack(myPlayer, myPlayer.idx);
						}
					}, true);
				}
				if (myPlayer.next) {
					myPlayer.next.addEventListener('click', function nextClicked(event) {
						event.preventDefault();
						if (myPlayer.idx + 1 < myPlayer.trackCount) {
							myPlayer.idx++;
							loadTrack(myPlayer, myPlayer.idx);
							if (myPlayer.playing) {
								myPlayer.action.innerHTML = 'playing&hellip;';
								myPlayer.player.play();
							}
						} else {
							pauseClicked(myPlayer)
							myPlayer.idx = 0;
							loadTrack(myPlayer, myPlayer.idx);
						}
					}, true);
				}
				if (myPlayer.seek) {
					myPlayer.seek.addEventListener('mousedown', function seekClicked() {
						clearTimeout(myPlayer.seeking);
						myPlayer.action.innerHTML = 'paused&hellip;';
						myPlayer.player.pause();
					}, true);
					myPlayer.seek.addEventListener('mouseup', function seekReleased() {
						myPlayer.player.currentTime = myPlayer.seek.value * myPlayer.player.duration / 100;
						updateSeek(myPlayer);
						if (myPlayer.playing) {
							myPlayer.action.innerHTML = 'playing&hellip;';
							myPlayer.player.play();
						}
					}, true);
					myPlayer.seek.addEventListener('touchstart', function seekClicked() {
						clearTimeout(myPlayer.seeking);
						myPlayer.action.innerHTML = 'paused&hellip;';
						myPlayer.player.pause();
					}, true);
					myPlayer.seek.addEventListener('touchend', function seekReleased() {
						myPlayer.player.currentTime = myPlayer.seek.value * myPlayer.player.duration / 100;
						updateSeek(myPlayer);
						if (myPlayer.playing) {
							myPlayer.action.innerHTML = 'playing&hellip;';
							myPlayer.player.play();
						}
					}, true);
				}
				if (myPlayer.wrapList) {
					myPlayer.wrapList.addEventListener('click', function listClicked(event) {
						var parent = event.target.parentNode;
						if (parent.parentNode.tagName.toLowerCase() === 'ol') {
							event.preventDefault();
							var len = myPlayer.playlist.length, i;
							for (i = 0; i < len; i++) {
								if (parent.dataset.idx == i + 1) {
									myPlayer.idx = i;
									playTrack(myPlayer, myPlayer.idx);
									i = len;
								}
							}
						}
					}, true);
				}
			}
		}
		if (myPlayer.tracks.length > 0) {
			myPlayer.wrap.className += ' enabled';
			loadTrack(myPlayer, myPlayer.idx);
		}
	};
	init(this);
}
