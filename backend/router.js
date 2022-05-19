var express = require('express');
var indexRouter  = express.Router();
var joinRouter = express.Router();
var userRouter  = express.Router();
var projectRouter  = express.Router();
var listRouter = express.Router();
const models = require("./models");
// var models = require('./models.js');

// for dev
const userId = 'ohtjqkd';
// endfor dev

indexRouter.post('/', (req, res) => {
    console.log('index router');
    var body = req.body;
    res.send('Saved');
})
indexRouter.get('/', (req, res) => {
    console.log('index router');
    res.send('index');
})

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

listRouter.get('/:projectTitle', (req, res) => {
    console.log('list list');
    models.project.findOne({ where: { title: req.params.projectTitle }})
    .then((r) => {
        if (r) {
            models.list.findAll({ where: { project_id: r.dataValues.id }})
            .then((r) => {
                res.send(r);
            });
        }
    })
})
listRouter.post('/add/:projectTitle', (req, res) => {
    console.log('list adding')
    models.project.findOne({where: {
        title: req.params.projectTitle
    }}).then((r) => {
        console.log(r)
        try {
            models.list.create({
                title: req.body.title,
                project_id: r.id
            }).then((r) => {
                res.send(r)
            })
        } catch (e) {
            console.log(e)
            res.send({status: 500})
        }
    })
    // models.list.read({
    //     title: req.params.listTitle,
    //     project_id: models.project.read({ title: req.params.projectTitle})
    // })
    // models.list.create({

    // })
})

projectRouter.get('/:title', (req, res) => {
    console.log('project router');
    models.project.findOne({ where: { title: req.params.title }})
    .then((r) => {
        if (r)
            console.log(r)
        res.send(r)
    });
})
projectRouter.post('/add', (req, res) => {
    models.project.create({
        title: req.body.title
    }).then((r) => {
        if (r) {
            res.send(r);
        }
    });
})
projectRouter.patch('/update/:origin_id', (req, res) => {
    models.project.update(req.body, {where: {id: req.params.origin_id}})
    .then((r) => {
        if (r) {
            res.send(r)
        }
    })
})


// userRouter.use('/:userId', projectRouter);
// userRouter.get('/:userId', (req, res) => {
//     console.log('user router');
// })


// joinRouter.post('/add', (req, res) => {
//     var userInfo = {id: req.body.userId};
//     res.send('Saved');
// })

exports.indexRouter = indexRouter;
// exports.userRouter = userRouter;
// exports.joinRouter = joinRouter;
exports.projectRouter = projectRouter;
exports.listRouter = listRouter;