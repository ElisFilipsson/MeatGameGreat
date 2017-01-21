import { Component } from '@angular/core';
import { Alert, Platform } from 'ionic-angular';
import { Base64ToGallery } from 'ionic-native';
import { Geolocation, Camera, File, Transfer, FilePath } from 'ionic-native';
declare var cordova: any;


@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})

export class CameraPage {
  lastImage: string = null;
  public lat: any;
  public lon: any;

  constructor(public platform: Platform) {

    Geolocation.getCurrentPosition().then(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      this.lat = pos.coords.latitude;
      this.lon = pos.coords.longitude;
    });

    /*let watch = Geolocation.watchPosition().subscribe(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      this.lat = pos.coords.latitude;
      this.lon = pos.coords.longitude;
    });*/

    // to stop watching
    //watch.unsubscribe();
  }
  // Create a new name for the image
  createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
  
  // Copy the image to a local folder
  copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      alert('Error while storing file: '+ error);
    });
  }
  
  // Always get the accurate path to your apps folder
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  takepic() {
          var options = {
            quality: 100,
            sourceType: Camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            cameraDirection: 0,
            targetWidth: 800,
            targetHeight: 800
          };

          Camera.getPicture(options).then((imagePath) => {

              var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
              var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

          }, (err) => {
            alert(err);
          });      
      }

      
      
  }