import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Geolocation, Camera, File } from 'ionic-native';
import { Alert, NavController } from 'ionic-angular';

declare var cordova: any;

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html'
})

export class GalleryPage {
  private posts: string[] = [];
  private items: any; // <- items property is now of the same type as posts
  public lat: any;
  public lon: any;

  constructor(public navCtrl: NavController, private http: Http) {
      Geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.lat = pos.coords.latitude;
        this.lon = pos.coords.longitude;
      });
    }

    ionViewWillEnter() {
      this.searchFiles();
    }
    ionViewWillLeave() {
        this.posts = [];
    }
    // Always get the accurate path to your apps folder
    pathForImage(img) {
      if (img === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + img;
      }
    }
   
    searchFiles(){
        File.listDir(cordova.file.dataDirectory, '').then(
        (files) => {
            // do something
            files = files.filter((file) => {
              if (file.isFile) {
                var temp = JSON.stringify({"name": file.name, "img": this.pathForImage(file.name)});
                this.posts.push(JSON.parse(temp));
              }
            })
            this.initializeItems();
        }
        ).catch(
        (err) => {
            // do something
            alert(err);
        }
        );
  }
  initializeItems() {
    this.items = this.posts;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
}
  
  
}
