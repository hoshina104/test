/*
  01  原版
  
*/
const medias = {
  audio: false,
  video: {
    facingMode: {
      exact: "environment"
    }
  }
};
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const promise = navigator.mediaDevices.getUserMedia(medias);
const stirngQR = {};

promise.then(successCallback)
       .catch(errorCallback);

function successCallback(stream) {
  video.srcObject = stream;
  requestAnimationFrame(draw);
  video.onloadedmetadata = (e) => {
     // QRコードのチェック開始
    checkPicture();
  };

}

function errorCallback(err) {
  console.log(err);
  alert(err);
}

function draw() {
//  canvas.width  = window.innerWidth;
//  canvas.height = window.innerHeight;
  canvas.width  = window.innerWidth;
  canvas.height = 640;
  ctx.drawImage(video, 0, 0);

  requestAnimationFrame(draw);
}

/**
 * QRコードの読み取り
 */
function checkPicture(){
  const imageData = ctx.getImageData(0, 0, this.width, this.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);
  if (code) {
      console.log("Found QR code", code, code.data);
  }
}