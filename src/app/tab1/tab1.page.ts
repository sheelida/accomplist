import { Component, ViewChild } from '@angular/core';
import { StorageService } from '../storage.service';
import { Task } from '../../models/task.model';
import { Tab3Page } from '../tab3/tab3.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  listTasks:Array<Task> = [];
  private theSearch = "";
  constructor(private storage:StorageService, public router:Router){

  }

  ionViewDidEnter(){
    this.storage.readData('list')
    .then((response:any)=>{
      if(response){
        this.listTasks = JSON.parse(response);
        this.sortList();
        console.log(this.listTasks);
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
    this.saveList();
  }
  saveList(){
    this.storage.saveData('list', this.listTasks )
    .then((response)=>{
      console.log("Data saved successfully!")
    })
    .catch((error)=>{
      console.log(error);

    });
  }
  sortList(){
    this.listTasks.sort((task1,task2)=>{
      if(!task2.status){
        return task2.id - task1.id;
      }else{
        return task1.id - task2.id;
      }
    })
  }

  taskDetails(id:number){
    this.router.navigate(['/tabs/tab3', {id}]);
  }

  taskSearch(input:string){
    if(this.theSearch.trim()){
      if(input.match(this.theSearch.trim())){
        return true;
      }else{
        return false;
      }
    }else{
      return true;
    }
  }

}
