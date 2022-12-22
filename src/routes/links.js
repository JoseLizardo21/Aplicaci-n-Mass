const {Router} = require('express');
const router = Router();
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');
router.get('/', isNotLoggedIn,(req, res)=>{
    res.json({isLoggedIn: false})
});
module.exports = router;