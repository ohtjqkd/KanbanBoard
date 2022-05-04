var express = require('express');
var indexRouter  = express.Router();
var joinRouter = express.Router();
var userRouter  = express.Router();
var projectRouter  = express.Router();
var models = require('./models.js');

// for dev
const userId = 'ohtjqkd';
// endfor dev

indexRouter.post('/', (req, res) => {
    var body = req.body;
    var newTodo = new Todo(body);
    newTodo.save(function(err, data){
        if (err) {
            console.log(err);
        } else {
            console.log('Saved!');
        }
    })
    res.send('Saved');
})
indexRouter.get('/', (req, res) => {
    Todo.find({}, (err, todo) => {
        if (err) {
            res.render('index', {});
        } else {
            console.log(todo);
            res.render('index', { todos: todo });
        }
    }).lean();
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

projectRouter.get('/:projectName', (req, res) => {
    console.log('project router');
    Todo.find({id: userId })
    .then((user) => {
        user
    })
    
})
projectRouter.post('/add', (req, res) => {
    console.log('project adding');
    console.log(req.params.userId);
    Todo.findOneAndUpdate({"id": userId}, { $push: {
        projects: { projectName: req.body.projectName }
    }}, (err, success) => {
        if (err) {
            console.log(err);
        } else {
            console.log(success);
        }
    }).then((doc) => {
        
    })
})

userRouter.use('/:userId', projectRouter);
userRouter.get('/:userId', (req, res) => {
    console.log('user router');
    Todo.find({"id": req.params.userId}, (err, user) => {
        if (err) {
            res.render('index', {})
        } else {
            res.send(user);
        }
    });
})


joinRouter.post('/add', (req, res) => {
    var userInfo = {id: req.body.userId};
    var newUser = new Todo(userInfo);
    newUser.save(function(err, data){
        if (err) {
            console.log(err);
        } else {
            console.log('Saved!');
        }
    })
    res.send('Saved');
})

exports.indexRouter = indexRouter;
exports.userRouter = userRouter;
exports.joinRouter = joinRouter;
exports.projectRouter = projectRouter;
// module.exports = indexRouter;