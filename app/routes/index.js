var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/file', (req, res) => {
  
   let form = new formidable.IncomingForm({
     /* Searches for upload directory in the root folder
      *  and keep file extension avoiding corruption
      */
     uploadDir: "./upload",
     keepExtensions: true,
   });

   form.parse(req, (err, fields, files) => {
     
     let path = "./" + fields.path; //Reads path gotten from HTTP Delete
     
     // Checks if file exists
     if (fs.existsSync(path)) {
       
       //Remove file
       fs.unlink(path, (err) => {
         if (err) {

			//return error 400
          	res.status(400).json();
           
         }
         else {
               
          	//return data from delete file
			res.json({
				fields,
			});
           
         }
       });
     }
    

   }); 

});

router.post('/upload',(req,res) =>{

  let form = new formidable.IncomingForm({
    /* Searches for upload directory in the root folder 
    *  and keep file extension avoiding corruption
    */
    uploadDir: './upload',
    keepExtensions: true
  });
 
  form.parse(req,(err, fields, files)=>{
        // Sends the files
        res.json({
          files
        });
  });
});

module.exports = router;
