const fs =require('fs');
const { json } = require('node:stream/consumers');

class Product{
    getAll(){
        const data = fs.readFileSync('./data/manga.json','utf-8');
        // console.log(data);
        // console.log(JSON.parse(data));
        return JSON.parse(data);
    }
    getOneById(id){
        const data = fs.readFileSync('./data/manga.json','utf-8');
        const jsonData = JSON.parse(data);
        for (let i=0;i<jsonData.length;i++){
            if(jsonData[i].id===id){
                // console.log(jsonData[i]);
            }
        }

    }


     updateById(id,product){
        const data = fs.readFileSync('./data/manga.json','utf-8');
        const jsonData = JSON.parse(data);
        
        let found=false, index;
        for (let i=0;i<jsonData.length;i++){
            if(jsonData[i].id===id){
                // jsonData[i].name = product.name;
                // jsonData[i].stock = product.stock; 
                jsonData[i]={...jsonData[i],...product}           
                found = true;
                index=i;
                break;              
            }           
            
        }
        if(!found){
            console.log('Id does not exist');
        }
        else{            
            console.log(jsonData[index]);
            //fs.writeFileSync('./data/manga.json',JSON.stringify(jsonData)); 
        }
    }


    deleteById(id){
        const data = fs.readFileSync('./data/manga.json','utf-8');
        const jsonData = JSON.parse(data);
        // let found=false;
        // for (let i=0;i<jsonData.length;i++){
        //     if(jsonData[i].id===id){
        //         jsonData.splice(i,1);  
        //         found = true;
        //         break;              
        //     }              
        // }        
        // if(!found){
        //     console.log('Id does not exist');
        // }
        // else{
        //     console.log(jsonData);
        //    // fs.writeFileSync('./data/manga.json',JSON.stringify(jsonData));
        // }


        const updateData = jsonData.filter(Data=> Data.id!==id);
        if(updateData.length===jsonData.length){
            console.log('ID does not exist');
        }
        else {
            const i = jsonData.findIndex(Data => Data.id === id); 
            jsonData.splice(i, 1);
            console.log(jsonData);
            fs.writeFileSync('./data/manga.json', JSON.stringify(jsonData));
        }
    }

    add(product){
        const data = JSON.parse(fs.readFileSync('./data/manga.json',"utf-8"));//Buffer
        // const jsonData = JSON.parse(data);
        // console.log({...product, id:jsonData[jsonData.length-1].id +1});
        // const newData = ({...product, id:data[data.length-1].id +1});
        // const newData =({...product, name:data[data.length-1].name +' first part.'})
        // data.push(newData);
        // console.log(data);
        // fs.writeFileSync('./data/manga.json',JSON.stringify(data));


    }
}

module.exports =new Product();