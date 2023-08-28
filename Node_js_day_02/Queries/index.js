const fs = require ('fs');
const fsPromise = require('fs').promises;
const path = require('path');
const { success } = require('../util/common');

const file = path.join(__dirname,'..','data','products.json');
const file1 = path.join(__dirname,'..','data','manga.js');
class Queries{
    // getAll function
    async getAll(){
         return fsPromise
        .readFile(file, {encoding:'utf-8'})
        .then((data)=>{
             return {success: true,data: data};
        })
        .catch((error)=>{
             return {success:false};
        })
    } ;
    
    //addItem

    async addItem(Product){

          const data = await fsPromise.readFile(file, { encoding: 'utf-8' });    
             
          const Data =JSON.parse(data);
          const addedData = {...Product,id: Product.id};
          const errors = [];

          if (!addedData.id) {
              errors.push('ID is required!');
          }
      
          if (!addedData.title || addedData.title.trim() === '') {
              errors.push('Title is required and cannot be blank.');
          }
      
          if (errors.length > 0) {
              return { success: false, errors: errors }; 
          }

          Data.push(addedData);
          const stringifyData =JSON.stringify(Data)

          return fsPromise
          .writeFile(file,stringifyData)
          .then(()=>{
               return {success: true};
          })
          .catch((error)=>{
               return {success:false};
          })

    }//end of addItem function

    
// getItemByID
    async getItemById(id){
     return fsPromise
     .readFile(file, {encoding:'utf-8'})
     .then((data)=>{
          const parsedData = JSON.parse(data);
          const findItem = parsedData.filter((item) => item.id === id);
          if(findItem){
               return {success:true, data :findItem};
          }
          else{
               return { success: false, message: 'No Item found!' };
          }
     })
     .catch((error)=>{
          return {success:false};
     })
    }

    //deleteByID
    async deleteById(id){
     return fsPromise
     .readFile(file1,{encoding:'utf-8'})
     .then((data)=>{
          const parsedData = JSON.parse(data);
          const updatedItem = parsedData.filter((item) => item.id !== id);
          const stringifyData =JSON.parse(updatedItem);

          return fsPromise
          .writeFile(file1, stringifyData, { encoding: 'utf-8' })
          .then(()=>{
               return { success: true };
          })
          .catch((error)=>{
               return { success: false };
          })  
         
     })
    }

 
}

module.exports = new Queries();