const {Router} = require('express');
const router = Router();
const passport = require('passport');
const {isLoggedIn} = require('../lib/auth')

router.post('/signUp', passport.authenticate('local.signup', {
    successRedirect: '/hola',
    failureRedirect: '/'
}));

router.get('/hola', (req, res)=>{
    console.log("se redirigió")
})
router.get('/p',isLoggedIn, (req,res)=>{
    res.send('Si ves esto es porque iniciaste sesión')
});
router.post('/signin', (req, res, next)=>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/'
    })(req, res, next);
})
router.get('/cerrar', (req, res)=>{
    req.logOut(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    res.send("Hola")
})
router.post('/probando', (req, res)=>{
    console.log(req.body)
})
module.exports = router;