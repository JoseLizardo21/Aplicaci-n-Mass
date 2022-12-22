const passport = require('passport');
const pool = require('../database')
const LocalStrategy = require('passport-local').Strategy;
const {CreateCode} = require('../algorithms/crtVerificationCode.js')
const transporter = require('../config/mailer');
const helpers = require('./helpers')

passport.use('local.signin', new LocalStrategy({
    usernameFiedl: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done)=>{
    const {email} = req.body;
    const rows = await pool.query('SELECT * FROM users WHERE  email = ?', [email]);
    if(rows.length > 0){
        const user = rows[0];
        const valuePassword = await helpers.matchPassword(password, user.password);
        if(valuePassword){
            done(null, user);
        }else{
            done(null, false);
        }
    }else {
        return done(null, false);
    }
}));


/* 
Esta es la primera ruta en donde se hará un registro temporal del usuario, aquí se le enviará un código de verificación al email y en caso no se acierte este registro será eliminado en el lapso de 60 segundos.
*/
passport.use('local.signup', new LocalStrategy({
    usernameFiedl: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=>{
    const { email } = req.body;
    const newUser = {
        email,
        username,
        password
    };
    newUser.password = await helpers.encrypPassword(password);
    const rowEmails = await pool.query('SELECT * FROM users WHERE email = ?', [newUser.email])
    if(rowEmails.length == 0){
        const result = await pool.query('INSERT INTO users SET ?', [newUser]);
        newUser.id = result.insertId;
        const codeV = {
            usrCreationCode: CreateCode(),
            user_id: result.insertId, 
            VerifiedAccount: 0
        };
        await pool.query('INSERT INTO VerificationCodes SET ?', [codeV]);
        await transporter.sendMail({
            from: '"MASS👻" <jose.212002lizardo@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Tu código de verificación es>>", // Subject line
            text: `El código es: ${codeV.usrCreationCode}`, // plain text body
            html: `<h1>El código es: ${codeV.usrCreationCode}</h1>`, 
          })
        setTimeout(async()=>{
            const rowVeri = await pool.query('SELECT * FROM VerificationCodes WHERE user_id = ?', [codeV.user_id]);
            if(rowVeri[0].VerifiedAccount == 0){
                pool.query('DELETE FROM users WHERE id = ?', [codeV.user_id]);
                req.logOut(function(err) {
                    if (err) { console.log(err); return next(err); }
                  });
            }
          }, 60000)
       return done(null, newUser);
    }else{
        return done(null, false)
    }
}));

passport.serializeUser((user, done)=>{
    done(null, user.id)
});

passport.deserializeUser(async(id, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
})