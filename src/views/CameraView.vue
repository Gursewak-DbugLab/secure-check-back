<template>
  <div>
    <h1>Login with QR Code</h1>
    <video ref="video" width="640" height="480" autoplay></video>
    <canvas ref="canvas" width="640" height="480" style="display:none;"></canvas>
    <p>{{ qrResult }}</p>
    <p>{{ status }}</p>
  </div>
</template>

<script>
import jsQR from 'jsqr';

export default {
  data() {
    return {
      qrResult: 'Waiting for QR code...',
      status: 'Status: Logged Out',
      stream: null,
      loggedIn: false,
      currentUser: "", // Store the email of the logged-in user
      scanInProgress: false, // Prevents multiple scans at once
    };
  },
  mounted() {
    this.startCamera();
  },
  methods: {
    // Start the camera and set up QR scanning
    startCamera() {
      const video = this.$refs.video;

      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          this.stream = stream;
          video.srcObject = stream;
          video.play(); // Ensure the video plays for scanning
          this.scanQRCode(); // Start scanning for QR codes
        })
        .catch((err) => {
          console.error('Error accessing camera: ', err);
        });
    },

    // QR code scanning logic using jsQR
    scanQRCode() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');

      const scan = () => {
        if (!this.scanInProgress) { // Only scan if another scan isn’t in progress
          this.scanInProgress = true;

          // Draw the current video frame to canvas
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            const qrData = code.data;

            // Check if the QR data is an email and toggle login/logout
            if (this.isValidEmail(qrData)) {
              this.handleLoginLogout(qrData);
            } else {
              this.qrResult = `QR Code detected but is not a valid email: ${qrData}`;
            }
          } else {
            this.qrResult = 'No QR code detected.';
          }

          setTimeout(() => {
            this.scanInProgress = false; // Allow next scan after delay
          }, 1000); // 1 second delay between scans
        }

        setTimeout(() => requestAnimationFrame(scan), 500); // 500ms delay between scan attempts
      };

      requestAnimationFrame(scan); // Start scanning
    },

    // Handle login/logout toggle with email
    handleLoginLogout(email) {
      if (!this.loggedIn) {
        // Log in the user if not already logged in
        this.loggedIn = true;
        this.currentUser = email;
        this.status = `Status: Logged In as ${email}`;
        this.qrResult = `Login successful for ${email}`;
      } else if (this.loggedIn && this.currentUser === email) {
        // Log out if the same user scans again
        this.loggedIn = false;
        this.currentUser = "";
        this.status = "Status: Logged Out";
        this.qrResult = "Logout successful!";
      } else {
        this.qrResult = `Already logged in as ${this.currentUser}. Please log out first.`;
      }

      // Pause scanning briefly after a login/logout action to prevent repeated toggles
      this.scanInProgress = true;
      setTimeout(() => {
        this.scanInProgress = false; // Re-enable scanning after 2 seconds
      }, 2000);
    },

    // Helper function to check if QR code contains a valid email
    isValidEmail(string) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(string);
    },
  },
  beforeUnmount() {  // Updated hook for Vue 3
    if (this.stream) {
      const tracks = this.stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop camera stream when component is unmounted
    }
  },
};
</script>

<style scoped>
video {
  border: 1px solid black;
}
</style>
