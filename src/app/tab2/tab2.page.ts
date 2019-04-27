import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  listTasks:Array<Task> = [];
  private theSearch = "";
  constructor(private storage:StorageService){

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
  deleteTask(id: number){
    this.listTasks.forEach((task, index) =>{
      if(task.id == id){
        this.listTasks.splice(index, 1);  
      }
    });
    this.saveList();
  }
  sortList(){
    this.listTasks.sort((task1,task2)=>{
      if(task2.status){
        return task2.id - task1.id;
      }else{
        return task1.id - task2.id;
      }
      
    })
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
