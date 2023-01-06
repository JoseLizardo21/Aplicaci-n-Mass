const {Router} = require('express');
const router = Router();
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');
const pool = require('../database')

router.get('/', isLoggedIn,(req, res)=>{
    res.json({isLoggedIn: true})
});

router.get('/showProfileImg/:usernameImg', async(req,res)=>{
    const {usernameImg} = req.params;
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [usernameImg]);
    const idConsult = rows[0].id;
    const rowImgProfileUser = await pool.query('SELECT * FROM imageProfile where image_id = ?', [idConsult]);
    res.json({img: rowImgProfileUser[0].nameImage})
});
router.use(require('./profile/profileDta'));
module.exports = router;