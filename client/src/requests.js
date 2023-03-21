export class Request{
    constructor(url){
        this.url = url;
    }

    async get(page){
        const response = await fetch(this.url +  page);
        const responseData = await response.json();

        return responseData;
    }

    async post(data, url = ""){
        const response = await fetch(this.url + url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              // 'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
        const responseData = await response.json();
 
        return responseData;
    }

    async put(id, data){
        const response = await fetch(this.url + "/" + id,{
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
        const responseData = await response.json();
 
        return responseData;
    }

    async delete(id){
        const response = await fetch(this.url + "/" + id,{
            method: 'DELETE'
          });
 
        return "Veri silindi..";
    }

}