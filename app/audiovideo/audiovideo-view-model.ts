import { Observable } from 'tns-core-modules/data/observable';
import { Video } from 'nativescript-videoplayer';

import { SelectedPageService } from '../shared/selected-page-service';

const isIOS = require('tns-core-modules/platform').isIOS;
const TNSPlayer = require('nativescript-audio').TNSPlayer;
const playerAudio = new TNSPlayer();
const topmost = require('tns-core-modules/ui/frame').topmost;
let _checkAudioInterval;

const playerOptions = {
  audioFile: 'https://www.w3schools.com/html/horse.mp3',
  loop: false,
  autoplay: false
};

export class AudioVideoViewModel extends Observable {
  constructor() {
    super();
    SelectedPageService.getInstance().updateSelectedPage('AudioVideo');

    playerAudio
      .initFromUrl(playerOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('something went wrong...', err);
      });
  }

  isAudioPlaying = false;
  isVideoPlaying = false;
  progressColumns = '0';
  playPauseAudio(args) {
    if (playerAudio.isAudioPlaying()) {
      playerAudio.pause();
    } else {
      playerAudio.play();
    }
  }

  _checkAudioInterval = setInterval(() => {
    playerAudio.getAudioTrackDuration().then(duration => {
      // iOS: duration is in seconds
      // Android: duration is in milliseconds
      let current = playerAudio.currentTime;
      if (isIOS) {
        duration *= 1000;
        current *= 1000;
      }

      let percent = Math.ceil((current / duration) * 100);

      this.set('progressColumns', percent + '*,' + (100 - percent) + '*');
      this.set('isAudioPlaying', playerAudio.isAudioPlaying());

      if (percent >= 100) {
        this.clearAudioTimer();
      }
    });
  }, 50);

  clearAudioTimer() {
    clearInterval(_checkAudioInterval);
  }

  playPauseVideo() {
    const page = topmost().currentPage;
    let video = <Video>page.getViewById('nativeVideoPlayer');

    if (!this.isVideoPlaying) {
      this.set('isVideoPlaying', true);
      video.play();
    } else {
      this.set('isVideoPlaying', false);
      video.pause();
    }
  }

  moveVideo() {
    const page = topmost().currentPage;
    let video = <Video>page.getViewById('nativeVideoPlayer');
    video.seekToTime(30000);
  }
}
