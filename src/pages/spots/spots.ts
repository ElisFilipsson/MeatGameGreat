import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-spots',
  templateUrl: 'spots.html'
})
export class SpotsPage {

  private posts: any; // <- I've added the private keyword 
  private items: any; // <- items property is now of the same type as posts
  private value: any;
  constructor(public navCtrl: NavController, private http: Http, private loadingCtrl: LoadingController) {

    // this.initializeItems(); <- you don't need this anymore

    // Show the loading message
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1500
    });
    loading.present();

    this.http.get('../assets/jsonfile/db.json').map(res => res.json()).subscribe(data => {
        this.items = data;
        this.filterItems();

        // Hide the loading message
        loading.dismiss();
    });
    }

    filterItems() {
      //this.items = this.posts;
      this.value = [this.items['0']];
      this.items = this.items.filter((item) => {
        if(item.name == this.items['0'].name){
          return (true);
        }
    })
    }
          
    
}
