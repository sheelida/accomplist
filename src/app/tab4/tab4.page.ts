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
    this.readStorage(); 
  }
 
  listTasks:Array<Task> = [];
  ngOnInit() {
  }

  readStorage(){
    this.storage.readData('list')
    .then((response:any)=>{
      if(response){        
        this.listTasks = JSON.parse(response);
        console.log(this.listTasks);
      }
    })
    .catch((error)=> console.log(error));
  }
  changePriorityLevel(level:number){
    this.priority = level;
    console.log("Priority set:", level);
  }
  addListTask(title:string, details:string, imagePath:string ){
    
    this.title = '';
    this.details = '';
    this.imagePath = '';
    let task = {
                title:  title, 
                details: details, 
                id: new Date().getTime(), 
                priority: this.priority, 
                status: false,
                imagePath: imagePath,
                date: new Date().getDate()
               }
    
    this.listTasks.push(task);
    this.sortList();
    this.saveList();
    this.router.navigate(['/tabs/tab1'])
  } 

  saveList(){
    this.storage.saveData('list', this.listTasks)
    .then((response)=>{
      console.log('Data saved successfully!');
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      console.log(err);
     });

  }
  
  sortList(){
    this.listTasks.sort((task1,task2)=>{
      return task2.id - task1.id;
    })
  }
}
