let processor = {
  timerCallback: function () {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    let self = this;
    setTimeout(function () {
      self.timerCallback();
    }, 0);
  },

  doLoad: function () {
    this.video = document.getElementById("video");
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
    this.c2 = document.getElementById("c2");
    this.ctx2 = this.c2.getContext("2d");
    let self = this;
    this.video.addEventListener(
      "play",
      function () {
        self.width = self.video.videoWidth / 2;
        self.height = self.video.videoHeight / 2;
        self.timerCallback();
      },
      false
    );
  },

  computeFrame: function () {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
    let l = frame.data.length / 4;

    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if (g < 10 && r < 11 && b < 10) frame.data[i * 4 + 3] = 0;
    }
    this.ctx2.putImageData(frame, 0, 0);
    return;
  },
};

document.addEventListener("DOMContentLoaded", () => {
  processor.doLoad();
});

// export default {
//     data() {
//       return {
//         interval: null,
//         bannerIndex: 0,
//         bannerImgs: ['/images/banner/B01.png', '/images/banner/B02.png', '/images/banner/B03.png'],
//         bannerMobileImgs: [
//           '/images/banner/ben01-mobile.png',
//           '/images/banner/ben02-mobile.png',
//           '/images/banner/ben03-mobile.png',
//           '/images/banner/ben04-mobile.png',
//         ],
//         processor: {},
//       };
//     },
//     computed: {
//       bannerImg() {
//         return this.bannerImgs[this.bannerIndex];
//       },
//       bannerMobileImg() {
//         return this.bannerMobileImgs[this.bannerIndex];
//       },
//     },
//     mounted() {
//       this.interval = setInterval(this.nextBanner, 5000);
//       document.addEventListener('DOMContentLoaded', () => {
//         this.processor.doLoad();
//       });
//     },
//     beforeDestroy() {
//       clearInterval(this.interval);
//     },
//     methods: {
//       nextBanner() {
//         this.bannerIndex = (this.bannerIndex + 1) % this.bannerImgs.length;
//       },
//       timerCallback() {
//         if (this.video.paused || this.video.ended) {
//           return;
//         }
//         this.computeFrame();
//         const self = this;
//         setTimeout(function () {
//           self.timerCallback();
//         }, 0);
//       },
//       doLoad() {
//         this.video = document.getElementById('video');
//         this.c1 = document.getElementById('c1');
//         this.ctx1 = this.c1.getContext('2d');
//         this.c2 = document.getElementById('c2');
//         this.ctx2 = this.c2.getContext('2d');
//         const self = this;
//         this.video.addEventListener(
//           'play',
//           function () {
//             self.width = self.video.videoWidth / 2;
//             self.height = self.video.videoHeight / 2;
//             self.timerCallback();
//           },
//           false
//         );
//       },
//       computeFrame() {
//         this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
//         const frame = this.ctx1.getImageData(0, 0, this.width, this.height);
//         const l = frame.data.length / 4;

//         for (let i = 0; i < l; i++) {
//           const r = frame.data[i * 4 + 0];
//           const g = frame.data[i * 4 + 1];
//           const b = frame.data[i * 4 + 2];
//           if (g < 10 && r < 11 && b < 10) frame.data[i * 4 + 3] = 0;
//         }
//         this.ctx2.putImageData(frame, 0, 0);
//       },
//     },
//   };
