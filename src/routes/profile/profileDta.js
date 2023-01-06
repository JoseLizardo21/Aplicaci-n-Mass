const {Router} = require('express');
const pool = require('../../database');
const router = Router();

router.get('/profileData/:userName', async(req, res)=>{
    const user = req.params.userName;
    const row = await pool.query("SELECT * FROM users WHERE username = ?", [user]);
    const {username, email} = row[0];
    const ResUser = {
        username,
        email,
        myAccount: req.hasOwnProperty("user") ? req.user.username === user : false,
    }
    res.json(ResUser);
})

module.exports = router;