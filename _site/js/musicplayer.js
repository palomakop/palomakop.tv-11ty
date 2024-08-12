// HTML5 audio player + playlist controls
var jsPlayer = document.querySelector('.player-wrap');
if (jsPlayer) {
	jsPlayer = {
		wrap: jsPlayer,
		player: (jsPlayer.querySelector('audio') || { play: function(){}, pause: function(){} }),
		play: (jsPlayer.querySelector('.play') || {}),
		pause: (jsPlayer.querySelector('.pause') || {}),
		seek: (jsPlayer.querySelector('.seek') || {}),
		prev: (jsPlayer.querySelector('.prev') || {}),
		next: (jsPlayer.querySelector('.next') || {}),
		button: (jsPlayer.querySelector('.button') || { style: {} }),
		wrapList: (document.querySelector('.playlist-wrap') || {}),
		action: (jsPlayer.querySelector('.action') || {}),
		title: (jsPlayer.querySelector('.title') || {}),
		current: (jsPlayer.querySelector('.current') || {}),
		duration: (jsPlayer.querySelector('.duration') || {}),
		trackCount: 0,
    seeking: null,
		playing: false,
		tracks: [],
		track: [],
		idx: 0
	};

	jsPlayer.playClicked = function jsPlayerPlayClicked(){
		jsPlayer.button.style.visibility = 'hidden';
		jsPlayer.pause.style.display = 'block';
		jsPlayer.play.style.display = 'none';
		jsPlayer.playing = true;
		jsPlayer.action.innerHTML = 'playing&hellip;';
		jsPlayer.player.play();
		jsPlayer.updateSeek();
	};
	jsPlayer.pauseClicked = function jsPlayerPauseClicked(){
		jsPlayer.play.style.display = 'block';
		jsPlayer.pause.style.display = 'none';
		clearTimeout(jsPlayer.seeking);
		jsPlayer.playing = false;
		jsPlayer.action.innerHTML = 'paused&hellip;';
		jsPlayer.player.pause();
	};
	jsPlayer.loadPlaylist = function jaPlayerLoadPlaylist(){
		jsPlayer.playlist = jsPlayer.wrapList? jsPlayer.wrapList.querySelectorAll('ol > li') : [];
		var len = jsPlayer.playlist.length,
			tmp, i;
		for (i = 0; i < len; i++) {
			if (!jsPlayer.playlist[i].dataset) {
				jsPlayer.playlist[i].dataset = {};
			}
			tmp = jsPlayer.playlist[i].querySelector('a');
			if (tmp && !jsPlayer.playlist[i].dataset.idx) {
				jsPlayer.playlist[i].dataset.idx = i + 1;
				jsPlayer.trackCount++;
				jsPlayer.tracks.push({
					"file": tmp.href,
					"name": (tmp.textContent || tmp.innerText).replace(/^\s+|\s+$/g, ''),
					"track": i + 1
				});
			}
		}
	};
	jsPlayer.loadTrack = function jsPlayerLoadTrack(idx){
		var len = jsPlayer.playlist.length,
			i;
		for (i=0; i < len; i++) {
			if (jsPlayer.playlist[i].classList) {
				if (i === idx) {
					jsPlayer.playlist[i].classList.add('sel');
				} else {
					jsPlayer.playlist[i].classList.remove('sel');
				}
			}
		}
		jsPlayer.title.innerHTML = jsPlayer.tracks[idx].name;
		jsPlayer.player.src = jsPlayer.tracks[idx].file;
	};
	jsPlayer.playTrack = function jsPlayerPlayTrack(idx){
		jsPlayer.loadTrack(idx);
		jsPlayer.playing = true;
		jsPlayer.playClicked();
	};
	jsPlayer.init = function jsPlayerInit(){
		var track = (jsPlayer.wrap && jsPlayer.wrap.dataset && jsPlayer.wrap.dataset.url)? jsPlayer.wrap : null,
			tmp, i;
		if (!!document.createElement('audio').canPlayType('audio/mpeg')) {
			if (jsPlayer.wrapList && jsPlayer.wrapList.querySelectorAll('ol > li').length > 0) {
				jsPlayer.loadPlaylist();
			} else if (track) {
				jsPlayer.tracks = [{
					"file": track.dataset.url,
					"name": (track.dataset.title || ''),
					"track": 1
				}];
			}
			if (jsPlayer.tracks.length > 0) {
				if (jsPlayer.player) {
					jsPlayer.player.addEventListener('ended', function playerEnded(){
						if (jsPlayer.idx + 1 < jsPlayer.trackCount) {
							jsPlayer.idx++;
							jsPlayer.playTrack(jsPlayer.idx);
						} else {
							jsPlayer.action.innerHTML = 'paused&hellip;';
							jsPlayer.player.pause();
							jsPlayer.idx = 0;
							jsPlayer.loadTrack(jsPlayer.idx);
						}
					}, true);
					jsPlayer.player.addEventListener('loadeddata', function playerLoadeddata(){
						jsPlayer.setDuration();
					}, true);
				}
				if (jsPlayer.play) {
					jsPlayer.play.addEventListener('click', jsPlayer.playClicked, true);
				}
				if (jsPlayer.pause) {
					jsPlayer.pause.addEventListener('click', jsPlayer.pauseClicked, true);
				}
				if (jsPlayer.button) {
					jsPlayer.button.addEventListener('click', function buttonClicked(event){
						event.preventDefault();
						jsPlayer.playClicked();
					}, true);
				}
				if (jsPlayer.prev) {
					jsPlayer.prev.addEventListener('click', function prevClicked(event){
						event.preventDefault();
						if (jsPlayer.idx - 1 > -1) {
							jsPlayer.idx--;
							jsPlayer.loadTrack(jsPlayer.idx);
							if (jsPlayer.playing) {
								jsPlayer.action.innerHTML = 'playing&hellip;';
								jsPlayer.player.play();
							}
						} else {
							jsPlayer.action.innerHTML = 'paused&hellip;';
							jsPlayer.playing = false;
							jsPlayer.player.pause();
							jsPlayer.idx = 0;
							jsPlayer.loadTrack(jsPlayer.idx);
						}
					}, true);
				}
				if (jsPlayer.next) {
					jsPlayer.next.addEventListener('click', function nextClicked(event){
						event.preventDefault();
						if (jsPlayer.idx + 1 < jsPlayer.trackCount) {
							jsPlayer.idx++;
							jsPlayer.loadTrack(jsPlayer.idx);
							if (jsPlayer.playing) {
								jsPlayer.action.innerHTML = 'playing&hellip;';
								jsPlayer.player.play();
							}
						} else {
							jsPlayer.action.innerHTML = 'paused&hellip;';
							jsPlayer.playing = false;
							jsPlayer.player.pause();
							jsPlayer.idx = 0;
							jsPlayer.loadTrack(jsPlayer.idx);
						}
					}, true);
				}
				if (jsPlayer.seek) {
					jsPlayer.seek.addEventListener('mousedown', function seekClicked(){
						clearTimeout(jsPlayer.seeking);
						jsPlayer.action.innerHTML = 'paused&hellip;';
						jsPlayer.player.pause();
					}, true);
					jsPlayer.seek.addEventListener('mouseup', function seekReleased(){
						jsPlayer.player.currentTime = jsPlayer.seek.value * jsPlayer.player.duration / 100;
						jsPlayer.updateSeek();
						if (jsPlayer.playing) {
							jsPlayer.action.innerHTML = 'playing&hellip;';
							jsPlayer.player.play();
						}
					}, true);
				}
				if (jsPlayer.wrapList) {
					jsPlayer.wrapList.addEventListener('click', function listClicked(event){
						var parent = event.target.parentNode;
						if (parent.parentNode.tagName.toLowerCase() === 'ol') {
							event.preventDefault();
							var len = jsPlayer.playlist.length,
							i;
							for (i = 0; i < len; i++) {
								if (parent.dataset.idx == i + 1) {
									jsPlayer.idx = i;
									jsPlayer.playTrack(jsPlayer.idx);
									i = len;
								}
							}
						}
					}, true);
				}
				jsPlayer.setDuration = function setDuration() {
					jsPlayer.duration.innerHTML = jsPlayer.formatTime(jsPlayer.player.duration);
					jsPlayer.current.innerHTML = jsPlayer.formatTime(jsPlayer.player.currentTime);
					jsPlayer.seek.value = jsPlayer.player.currentTime / jsPlayer.player.duration;
				};
				jsPlayer.updateSeek = function updateSeek() {
					jsPlayer.seek.value = 100 * jsPlayer.player.currentTime / jsPlayer.player.duration;
					jsPlayer.current.innerHTML = jsPlayer.formatTime(jsPlayer.player.currentTime);
					if (jsPlayer.playing) {
						jsPlayer.seeking = setTimeout(jsPlayer.updateSeek, 500);
					}
				};
				jsPlayer.formatTime = function formatTime(val) {
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
					val = (h > 0)? h + ':' : '';
					val += (m > 0)? ((m < 10 && h > 0)? '0' : '') + m + ':' : '0:';
					val += ((s < 10)? '0' : '') + s;
					return val;
				};
			}
		}
		if (jsPlayer.tracks.length > 0) {
			jsPlayer.wrap.className += ' enabled';
			jsPlayer.loadTrack(jsPlayer.idx);
		}
	};
	jsPlayer.init();
}