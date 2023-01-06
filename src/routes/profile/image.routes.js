const { Router } = require('express'); 
const router = new Router();
const { v4: uuid } = require('uuid');
const path = require('path');
const multer = require('multer');
const { isLoggedIn } = require('../../lib/auth');
const pool = require('../../database')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  async(req, file, cb) => {
        const nameImg = uuid() + path.extname(file.originalname).toLocaleUpperCase();
        const newPofileImg = {
            nameImage : nameImg,
            image_id: req.user.id
        }
        await pool.query('INSERT INTO imageProfile SET ?', [newPofileImg]);
        cb(null, nameImg);
    }
})
const uploadImage = multer({
    storage,
    limits: {fileSize: 5000000},
    fileFilter: (req, file, cb)=>{
        const filetype = /jpeg|png|jpg/;
        const minetype = filetype.test(file.mimetype);
        const extname = filetype.test(path.extname(file.originalname));
        if(minetype && extname){
            return cb(null, true)
        }
        cb("error: el archivo debe de ser valido")
    }
}).single('image');

router.post('/uploadUserImage', isLoggedIn,(req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        res.json({res: true});
    });
});

module.exports = router;