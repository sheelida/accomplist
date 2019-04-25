import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';

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
  listTasks:Array<Task> = [];

  constructor(private storage:StorageService, private router:Router) { }

  ngOnInit() {
  }
  changePriorityLevel(level:number){
      this.priority = level;
  }
  addListTask(title:string, details:string, priority:number,imagePath:string ){
    this.title = '';
    this.details = '';
    this.priority = null;
    this.imagePath = '';

    let task = {
                title:  title, 
                details: details, 
                id: new Date().getTime(), 
                priority: priority, 
                status: false,
                imagePath: imagePath,
                date: new Date().getDate()
               }
    this.listTasks.push(task);
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
}
