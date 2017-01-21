import { Component } from '@angular/core';

import { CameraPage } from '../camera/camera';
import { GalleryPage } from '../gallery/gallery';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = CameraPage;
  tab2Root: any = GalleryPage;
  
  constructor() {

  }
}
