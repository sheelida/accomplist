import { Component, ViewChild } from '@angular/core';
import { StorageService } from '../storage.service';
import { Task } from '../../models/task.model';
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

  // DATA LOAD WHEN ENTER THE VIEW AND ALSO ADD TO THE ARRAY LISTTASKS
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
  // CHANGE THE STATUS TO TRUE OR FALSE
  changeItemStatus(id:number){
    this.listTasks.forEach((task)=>{
      if(task.id == id){
        task.status = !task.status;
      }
    })
    //SAVE LIST TO STORAGE AFTER CHANGED
    this.saveList();
  }


  saveList(){
    //SAVE DATA TO THE STORAGE (REFRESH THE STORAGE)
    this.storage.saveData('list', this.listTasks )
    .then((response)=>{
      console.log("Data saved successfully!")
    })
    .catch((error)=>{
      console.log(error);

    });
  }
  sortList(){
    //SORT LIST BY ID IF THE SAME STATUS
    this.listTasks.sort((task1,task2)=>{
      if(!task2.status){
        return task2.id - task1.id;
      }else{
        return task1.id - task2.id;
      }
    })
  }

  taskDetails(id:number){
    //REDIRECT TO ANOTHER PAGE WITH THE ID SELECTED
    this.router.navigate(['/tabs/tab3', {id}]);
  }

  taskSearch(input:string){
    //DO THE SEARCH VIA THE LIST THAT IS ACTUALLY SHOWING
    if(this.theSearch.trim()){
      // trim the search input and match with the list items
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
