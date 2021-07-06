class DropBoxController{

    constructor(){

        this.btnSendFilesEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackBarModalEl = document.querySelector('#react-snackbar-root');


        this.initEvents();

    }

    initEvents(){

        this.btnSendFilesEl.addEventListener('click', event =>{

            this.inputFilesEl.click();

        });

        this.inputFilesEl.addEventListener('change', event=>{

            console.log(event.target.files); //Shows targeted file
            this.uploadTask(event.target.files);

            this.snackBarModalEl.style.display = 'block'; //Loading bar

        });

    }

    uploadTask(files){

        let promises = []; //Promises array

        //Spread operator for looping through non-array data
        [...files].forEach(file=>{
            
            /*
            * Promises collection for each uploaded file.
            * Pushes all the files for an array, creating a promise
            * for each of the files
            */
            promises.push(new Promise((resolve,reject)=>{

                let ajax = new XMLHttpRequest();

                ajax.open('POST','/upload'); // POST to 'upload' route

                // Check if and when completed succesfully
                ajax.onload = event => {

                    try{
                        resolve(JSON.parse(ajax.responseText)); //Obtain Server OK response
                    } catch(e){
                        reject(e);
                    }
                }
                
                // Check if error occurred
                ajax.onerror = event=>{
                    reject(event);
                };

                let formData = new FormData(); //FormData to read the selected uploaded file

                formData.append('input-file',file); //Append the sent file

                ajax.send(formData); //Send file via Ajax
            
            }));

        });


        /*
        * Return after all promises returned OK
        *   a. If all resolved, it'll resolve
        *   b. If there's a rejection, it'll reject
        */
        return Promise.all(promises); 

    }

}