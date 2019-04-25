import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveData(key,value){
    return new Promise((resolve,reject) =>{
      window.localStorage.setItem(key, JSON.stringify(value));

      if(window.localStorage.getItem(key)){
        resolve(true);
      }
      else{
        return(false);
      }
    })
  }
  readData(key){
    return new Promise((resolve, reject)=>{
      try{
        let data = window.localStorage.getItem(key);
        if(data){
          resolve(data);
        }else{
          throw('No data available')
        }
      }catch(exception){
        reject(exception);
      }
    })
  }
}
