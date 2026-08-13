/* ==========================================================================
   CREOVATE VIDEO SHOWCASE PLAYER MODULE
   ========================================================================== */

class VideoPlayerModal {
  constructor() {
    this.modal = document.getElementById('videoModal');
    this.video = document.getElementById('showreelVideo');
    this.closeBtn = document.getElementById('closeVideoBtn');
    this.triggerBtn = document.getElementById('openShowreelCard');
    this.triggerHeroBtn = document.getElementById('openShowreelHeroBtn');

    if (this.modal) {
      this.init();
    }
  }

  init() {
    // Open triggers
    if (this.triggerBtn) {
      this.triggerBtn.addEventListener('click', () => this.open());
    }
    if (this.triggerHeroBtn) {
      this.triggerHeroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    }

    // Close triggers
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (this.video) {
      this.video.currentTime = 0;
      this.video.play().catch(err => {
        console.log('Video autoplay prevented or source loading:', err);
      });
    }
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    if (this.video) {
      this.video.pause();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.creovateVideoPlayer = new VideoPlayerModal();
});
