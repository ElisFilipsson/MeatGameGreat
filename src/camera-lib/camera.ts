import { Camera } from 'ionic-native';
import { Alert} from 'ionic-angular';


export class CameraLib {
  base64Image

  constructor() {
  }

        takePhoto(pictureSourceType) {
            this.takeThePhoto(Camera.PictureSourceType.CAMERA);
        }

        pickImage() {
            this.takeThePhoto(Camera.PictureSourceType.SAVEDPHOTOALBUM);
        }

        squareImg() {
            this.base64Image = this.resize(this.base64Image, 150, 150);
        }

        takeThePhoto(pictureSourceType) {
            Camera.getPicture({
                sourceType: pictureSourceType,
                destinationType: Camera.DestinationType.FILE_URI,
                quality: 50,
                targetWidth: 720,
                correctOrientation: true,
                encodingType: Camera.EncodingType.JPEG
            })
                .then(
                imageURI => {
                    window['plugins'].crop.promise(imageURI, {
                        quality: 75
                    }).then(newPath => {
                            return this.toBase64(newPath).then((base64Img) => {
                                this.base64Image = base64Img;
                            });
                        },
                        error => {
                            console.log("CROP ERROR -> " + JSON.stringify(error));
                            alert("CROP ERROR: " + JSON.stringify(error));
                        }
                        );
                },
                error => {
                    console.log("CAMERA ERROR -> " + JSON.stringify(error));
                    alert("CAMERA ERROR: " + JSON.stringify(error));
                }
                );
        }

        toBase64(url: string) {
            return new Promise<string>(function (resolve) {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        resolve(reader.result);
                    }
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.send();
            });
        }

        resize(base64Img, width, height) {
            var img = new Image();
            img.src = base64Img;
            var canvas = document.createElement('canvas'),ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            return canvas.toDataURL("image/jpeg");
        }
}