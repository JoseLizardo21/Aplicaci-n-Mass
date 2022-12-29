const {Router} = require('express');
const router = Router();
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');
router.get('/', isLoggedIn,(req, res)=>{
    res.json({isLoggedIn: true})
});
module.exports = router;