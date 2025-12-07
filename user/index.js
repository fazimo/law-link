const moshavere = require('./../moshavere')
const answer = require('./../answer')
const User = require('./../user')
const Vakil = require('./../vakil')
class index {

    async index(req, res) {
        let ok = "false"
        const user = req.signedCookies.auth;
        if (user) {
            ok = "true"
        }
        let vakil = await Vakil.find({})
        res.render('home', { ok , vakil })

    }

    async create_ask(req, res) {
        const user = req.signedCookies.auth;
        let use = await User.find(user)

        let code = await Math.floor(Math.random() * 1000000);
        await moshavere.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
            vakil: req.body.id,
            user: use[0].id,
        })

        res.render('code_inv', { code })
    }

    async ask(req, res) {
        let ok = "false"
        const user = req.signedCookies.auth;
        if (user) {
            ok = "true"
        }
        let vakil = await Vakil.find({})
        res.render('ask', { ok , vakil})
    }

    async poblic(req, res) {
        let ok = "false"
        const user = req.signedCookies.auth;
        if (user) {
            ok = "true"
        }
        let use = await User.find(user)
        let message = await moshavere.find({})
        res.render('public', { mes: message, ok, use: use[0] })
    }

    async message_det(req, res) {
        let ok = "false"
        const user = req.signedCookies.auth;
        let use = await User.find(user)
        if (user) {
            ok = "true"
        }
        let mes = await moshavere.findById(req.params.id)
        let ans = await answer.find({ mes_id: req.params.id })
        res.render('pubdet', { mes, ans, ok, use })
    }

    async submit_answer(req, res) {
        const user = req.signedCookies.auth;
        let use = await User.find(user)
        await answer.create({
            name: req.body.name,
            phone: req.body.phone,
            message: req.body.message,
            mes_id: req.params.id,
            vakil : use.vakil
        })
        res.redirect('/messagedet/' + req.params.id)
    }

    async signin(req, res) {
        User.create({
            name: req.body.name,
            phone: req.body.phone,
            password: req.body.password,
            type: 0,
            vid : ""
        })
        await res.cookie('auth', { phone: req.body.phone, password: req.body.password }, { signed: true, maxAge: 9000000, httpOnly: true })
        await res.cookie('is_auth', true, { signed: true, httpOnly: true })

        res.redirect('/')
    }

    async login(req, res) {
        let user = await User.findOne({ phone: req.body.phone, password: req.body.password })
        if (user) {
            await res.cookie('auth', { phone: req.body.phone, password: req.body.password }, { signed: true, maxAge: 9000000, httpOnly: true })
            await res.cookie('is_auth', true, { signed: true, httpOnly: true })
        }
        res.redirect('/')
    }

    async free_ask(req, res) {
        let ok = "false"
        const user = req.signedCookies.auth;
        if (user) {
            ok = "true"
        }
        let random = await Math.floor(Math.random() * 1000000);
        res.render('free_ask', { random, ok })
    }
    async create_ask_free(req, res) {
        console.log('here');
        await moshavere.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        })

        res.redirect('/public')
    }

    async vakil_panel(req , res){
        let ok = "false"
        const user = req.signedCookies.auth;
        if (user) {
            ok = "true"
        }
        let use = await User.find(user)
        if(use[0].type == 1){
            let message = await moshavere.find({vakil : use[0].vid})
            res.render('vpanel' , {ok  , mes : message , use : use[0]})
        }
        
        if(use[0].type == 0){
            let message = await moshavere.find({user : use[0].id})
            res.render('vpanel' , {ok  , mes : message , use : use[0]})
        }

        if(use[0].type ==2){
            let vakil = await Vakil.find({})
            res.render('apanel' , {ok  ,vakil , use : use[0]})
        }
    }

    async v_submit_answer(req, res) {
        const user = req.signedCookies.auth;
        let use = await User.find(user)
        await answer.create({
            name: req.body.name,
            phone: req.body.phone,
            message: req.body.message,
            mes_id: req.params.id,
            vakil : use.vakil
        })
        res.redirect('/vpanel')
    }

    async vakil(req , res){
        Vakil.create({
            name: req.body.name,
            phone: req.body.phone,
            tume: req.body.thume,
            main: req.body.main,
            semat: req.body.password,
        })
        res.redirect('/vpanel')
    }

}

module.exports = new index


