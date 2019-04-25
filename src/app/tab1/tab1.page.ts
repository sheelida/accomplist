import { Component, ViewChild } from '@angular/core';
import { StorageService } from '../storage.service';
import { Task } from '../../models/task.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  listTasks:Array<Task> = [];

  constructor(private storage:StorageService){

  }


  ionViewDidEnter(){
    this.storage.readData('list')
    .then((response:any)=>{
      if(response){
        this.listTasks = JSON.parse(response);
      }
    })
    .catch((error)=> console.log(error));
  }

  changeItemStatus(id:number){
    this.listTasks.forEach((task)=>{
      if(task.id == id){
        task.status = !task.status;
      }
    })
  }


}
