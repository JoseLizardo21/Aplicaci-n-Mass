const passport = require('passport');
const pool = require('../database')
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done)=>{
    const rows = await pool.query('SELECT * FROM usuario WHERE usuario_nombre = ?', [username]);
    if(rows.length > 0){
        const user = rows[0];
        done(null, user)
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField : 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done)=>{
    const {email} = req.body
    const newUser = {
        username,
        email,
        password
    }
    const result = await pool.query('INSERT INTO usuario SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser)
}));

passport.serializeUser((user, done)=>{
    done(null, user.id)
});

passport.deserializeUser(async(id, done)=>{
    const rows = await pool.query('SELECT * FROM usuario WHERE usuario_id = ?', [id]);
    done(null, rows[0]);
})