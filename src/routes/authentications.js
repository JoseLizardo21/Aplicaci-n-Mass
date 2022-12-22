const {Router} = require('express');
const router = Router();
const passport = require('passport');
const pool = require('../database');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth')
const {CreateCode} = require('../algorithms/crtVerificationCode.js');
const transporter = require('../config/mailer');

router.post('/VerifyAccount', async(req, res)=>{
    const {code} = req.body;
    const rowVer = await pool.query('SELECT * FROM VerificationCodes WHERE user_id = ?', [req.user.id]);
    if(rowVer[0].usrCreationCode == code){
        console.log("llegó")
        await pool.query('UPDATE VerificationCodes SET VerifiedAccount = 1');
        res.json({success: true});
    }else{
        res.json({success: false});
    }
})
router.post('/signUp', passport.authenticate('local.signup', {
    successRedirect: 'success',
    failureRedirect: 'failure'
}));
router.post('/signin', isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: 'p',
        failureRedirect: 'nu',
    })(req, res, next);
});
router.get('/success', (req, res)=>{
    res.json({success: true})
})
router.get('/failure', (req, res)=>{
    res.json({success: false});
})
router.post('/success', (req, res)=>{
    res.json({success: true})
})
router.post('/failure', (req, res)=>{
    res.json({success: false});
})
router.get('/cerrar', (req, res)=>{
    req.logOut(function(err) {
        if (err) {return next(err);}
        
      });
    res.json({result: true})
})
module.exports = router;