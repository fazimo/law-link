const express = require('express');
const router = express.Router();
const home = require('./user/index')
const User = require('./user')
const Vakil = require('./vakil')

router.get('/', home.index)
router.get('/vakil_singl/:id', async (req, res) => {
    let ok = "false"
    const user = req.signedCookies.auth;
    let use = await User.find(user)
    if (user) {
        ok = "true"
    }
    let vakil = await Vakil.findById(req.params.id)
    res.render('loyalab', {ok , use : use[0] , vakil})
})
router.get('/sk', async (req, res) => {
    let ok = "false"
    const user = req.signedCookies.auth;
    let use = await User.find(user)
    if (user) {
        ok = "true"
    }
    res.render('loyalsk', {ok , use : use[0]})
})
router.get('/shk', async (req, res) => {
    let ok = "false"
    const user = req.signedCookies.auth;
    let use = await User.find(user)
    if (user) {
        ok = "true"
    }
    res.render('loyalshk', {ok , use : use[0]})
})

router.post('/moshavere', home.create_ask)

router.get('/ask', home.ask)

router.get('/public', home.poblic)

router.post('/signin', home.signin)

router.post('/login', home.login)

router.get('/messagedet/:id' , home.message_det)

router.post('/subans/:id' , home.submit_answer)

router.get('/free_ask' , home.free_ask)

router.post('/free_create' , home.create_ask_free)

router.get('/vpanel' , home.vakil_panel)
router.get('/panel' , home.vakil_panel)

router.post('/vanswer/:id' , home.v_submit_answer)

router.post('/vakil' , home.vakil)

router.get('/logout', async (req, res) => {
    await res.clearCookie('auth')
    await res.cookie('is_auth', false, { signed: false, httpOnly: true })
    return res.redirect("/");
})

router.get('/vc' , (req , res) =>{
    let ok = "false"
    const user = req.signedCookies.auth;
    if (user) {
        ok = "true"
    }
    res.render('vc' , {ok})
})

const vakil = require('./vakil')
router.post('/vc' ,async (req , res) =>{
    await vakil.create({
        name : req.body.name,
        phone : req.body.phone,
        tume : req.body.tume,
        main : req.body.main,
        log : req.body.log,
        loc : req.body.loc,
        semat : req.body.semat
    })
    res.redirect('/')
})
module.exports = router;