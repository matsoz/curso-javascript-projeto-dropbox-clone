var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
