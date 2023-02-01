var gaxios = require('gaxios');
const { google } = require('googleapis');
var express = require('express');
var jwt = require('jsonwebtoken');
// for dev
const db = require("../models");
const jwt_decoder = require('jwt-decode')
// const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const userId = 'ohtjqkd';
// endfor dev
const auth_url = 'https://accounts.google.com/o/oauth2/auth';
const auth_token_url = 'https://oauth2.googleapis.com/token';
const redirect_url = 'http://localhost:5000/api/v1/auth/login/google/postmessage';
const client_id = '1066142769848-nb4mnr77e05v52jjpear80vu8mvjvt6v.apps.googleusercontent.com'
const secret = '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'
const auth = require('../middlewares/authentication');
const oauth2Client = new google.auth.OAuth2(
    client_id,
    secret,
    redirect_url
)
var router = express.Router()
router.use((req, res, next) => {
    next();
})
router.get('/', auth, (req, res) => {
    res.send('hello');
})

router.get('/api/v1/auth/login/google/postmessage', async (req, res) => {
    console.log(req.query);
    const { code } = req.query;
    try {
        const { data } = await gaxios.request({
            method: 'POST',
            url: `${auth_token_url}`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                grant_type: 'authorization_code',
                client_id: client_id,
                client_secret: secret,
                redirect_uri: redirect_url,
                code: code
            }
        })
        const access_token = data['access_token'];
        console.log('=============== data ==============');
        console.log(data);
        console.log(jwt_decoder(data.id_token));
        console.log('=============== access_token ==============');
        console.log(access_token);
        var jwt_option = {
            algorithm: 'HS256',
            expiresIn: '30m',
            issuer: 'junsoh'
        }
        var jwt_token = jwt.sign(data, secret, jwt_option);
        console.log(jwt_token);
        res.append('Set-Cookie', `access_token=${jwt_token};`)
        console.log(res.getHeaders());
        res.redirect('http://localhost:8080/');
    } catch (e) {
        console.error(e);
    }
})

router.post('/api/v1/auth/login/google', async (req, res) => {
    // 이 부분을 좀 개선하고 싶은데
    // console.log(req.query);
    // const { code } = req.query;
    try {
    //     const { data } = await gaxios.request({
    //         method: 'POST',
    //         url: `${auth_token_url}`,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         params: {
    //             grant_type: 'authorization_code',
    //             client_id: client_id,
    //             client_secret: secret,
    //             redirect_uri: redirect_url,
    //             code: code
    //         }
    //     })
    //     const access_token = data['access_token'];
    //     console.log('=============== data ==============');
    //     console.log(data);
    //     console.log(jwt_decoder(data.id_token));
    //     console.log('=============== access_token ==============');
    //     console.log(access_token);
        var jwt_option = {
            algorithm: 'HS256',
            expiresIn: '30m',
            // issuer: 'junsoh'
        }
        console.log('req', req);
        console.log('req body', req.body);
        const verified = await oauth2Client.verifyIdToken({idToken: req.body.credential});
        console.log(verified);
        var jwt_token = jwt.sign(verified.payload, secret, jwt_option);
        res.append('Set-Cookie', `access_token=${jwt_token};`)
        console.log(res.getHeaders());
    } catch (e) {
        console.error(e);
    }    
    res.send(jwt_token);
    // res.redirect(`${auth_url}?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=code&include_granted_scopes=true&scope=https://www.googleapis.com/auth/userinfo.email`)
})

router.get('/api/project/:projectName', (req, res) => {
    console.log(req);
});
module.exports = router
// indexRouter.post('/', (req, res) => {
//     console.log('index router');
//     var body = req.body;
//     res.send('Saved');
// })
// indexRouter.get('/', (req, res) => {
//     console.log('index router');
//     res.send('index');
// })

// projectRouter.get('/all', (req, res) => {
//     console.log(req.params.userId);
//     Todo.find({id: req.params.userId}, (err, user) => {
//         if (err) {
//             res.render('index', {})
//         } else {
//             res.send(user.projects);
//         }
//     });
// })

// listRouter.get('/:projectTitle', (req, res) => {
//     console.log('list list');
//     models.project.findOne({ where: { title: req.params.projectTitle }})
//     .then((r) => {
//         if (r) {
//             models.list.findAll({ where: { project_id: r.dataValues.id }})
//             .then((r) => {
//                 res.send(r);
//             });
//         }
//     })
// })
// listRouter.post('/add/:projectTitle', (req, res) => {
//     console.log('list adding')
//     models.project.findOne({where: {
//         title: req.params.projectTitle
//     }}).then((r) => {
//         console.log(r)
//         try {
//             models.list.create({
//                 title: req.body.title,
//                 project_id: r.id
//             }).then((r) => {
//                 res.send(r)
//             })
//         } catch (e) {
//             console.log(e)
//             res.send({status: 500})
//         }
//     })
//     // models.list.read({
//     //     title: req.params.listTitle,
//     //     project_id: models.project.read({ title: req.params.projectTitle})
//     // })
//     // models.list.create({

//     // })
// })

// projectRouter.get('/:title', (req, res) => {
//     console.log('project router');
//     models.project.findOne({ where: { title: req.params.title }})
//     .then((r) => {
//         if (r)
//             console.log(r)
//         res.send(r)
//     });
// })
// projectRouter.post('/add', (req, res) => {
//     models.project.create({
//         title: req.body.title
//     }).then((r) => {
//         if (r) {
//             res.send(r);
//         }
//     });
// })
// projectRouter.patch('/update/:origin_id', (req, res) => {
//     models.project.update(req.body, {where: {id: req.params.origin_id}})
//     .then((r) => {
//         if (r) {
//             res.send(r)
//         }
//     })
// })


// // userRouter.use('/:userId', projectRouter);
// // userRouter.get('/:userId', (req, res) => {
// //     console.log('user router');
// // })


// // joinRouter.post('/add', (req, res) => {
// //     var userInfo = {id: req.body.userId};
// //     res.send('Saved');
// // })

// exports.indexRouter = indexRouter;
// // exports.userRouter = userRouter;
// // exports.joinRouter = joinRouter;
// exports.projectRouter = projectRouter;
// exports.listRouter = listRouter;