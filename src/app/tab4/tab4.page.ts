import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  title:string;
  details:string;
  priority:number;
  imagePath:string;


  constructor(private storage:StorageService, private router:Router, private camera:Camera) {
  }
 
  listTasks:Array<Task> = [];
  ngOnInit() {
  }

  //READ DATA FROM LOCAL STORAGE
  ionViewDidEnter(){
    this.storage.readData('list')
    .then((response:any)=>{
      if(response){        
        this.listTasks = JSON.parse(response);
        console.log(this.listTasks);
      }
    })
    .catch((error)=> console.log(error));
  }
  //GET THE PRIORITY LEVEL BASED ON A NUMBER
  changePriorityLevel(level:number){
    // ASSIGN THE LEVEL TO THE LOCAL VARIABLE
    this.priority = level;
    console.log("Priority set:", level);
  }
  addListTask(title:string, details:string, imagePath:string ){
    
    this.title = '';
    this.details = '';
    this.imagePath = '';
    //BUILD THE OBJECT BASED ON THE PARAMS
    let task = {
                title:  title, 
                details: details, 
                id: new Date().getTime(), 
                priority: this.priority, 
                status: false,
                imagePath: imagePath,
                date: new Date().getDate()
               }
    //PUSH IT ALL TO THE ARRAY
    this.listTasks.push(task);
    //SORT THE LIST ACCORDINGLY
    this.sortList();
    //SAVE TO THE LOCAL STORAGE
    this.saveList();
    //REDIRECT TO THE LIST PAGE
    this.router.navigate(['/tabs/tab1'])
  } 

  saveList(){
    //SAVE DATA TO THE STORAGE (REFRESH THE STORAGE)
    this.storage.saveData('list', this.listTasks)
    .then((response)=>{
      console.log('Data saved successfully!');
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  takePicture(){
    //CREATE THE CONSTANT OF CAMERA OPTIONS
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    // GET PICTURE(CAMERA) BASED ON THE OPTIONS PROVIDED
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let win: any = window;
      // TRANSFORM FILE URI TO LOCALHOST URL
      this.imagePath = win.Ionic.WebView.convertFileSrc(imageData);
     }, (err) => {
      console.log(err);
     });

  }
  
  sortList(){
    //SORT LIST BY ID IF THE SAME STATUS
    this.listTasks.sort((task1,task2)=>{
      return task2.id - task1.id;
    })
  }
}
