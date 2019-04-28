import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  //NEEDED TO GET THE ID FROM URL 
import { Task } from 'src/models/task.model';
import { StorageService } from '../storage.service'; 

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  id:number;
  listTasks:Array<Task> = [];
  title:string;
  details:string;
  priority:number;
  imagePath:string;
  status:boolean;
  dateCreated:number;

  constructor(private storage:StorageService, private route: ActivatedRoute){
    // GET THE ID FROM THE URL
    this.id = JSON.parse(this.route.snapshot.paramMap.get('id'));    
  }
  ngOnInit(){
  }
  // DATA LOAD WHEN ENTER THE VIEW AND ALSO ADD TO THE ARRAY LISTTASKS
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

  // GET ALL DETAILS NEEDED TO SHOW IN THE PAGE 
  taskDetails(){
      this.listTasks.forEach((task)=>{
      //IF THE ID OF THE LIST MATCHES THE ID FROM THE URL
      if(task.id == this.id){
        //ASSIGN THEM TO LOCAL VARIABLES
        this.title = task.title;
        this.details = task.details;
        this.priority = task.priority;
        this.imagePath = task.imagePath;
        this.status = task.status;
        this.dateCreated = task.date;
  
      }
    })
  }

}
