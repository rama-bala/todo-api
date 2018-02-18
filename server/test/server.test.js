const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../model/todo');
const { User } = require('./../model/user');
const { todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) return done(err);
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create a new todo', (done) => {
        var text = ' ';
        
        request(app)
        .post('/todos')
        .send({ text })
        .expect(400)
        .end((err, res) => {
            if (err) return done(err);
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });

        
    });



});


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);

        
    });
});

describe('GET /todos:id', () => {

    it("Should return first todo.", (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it("Should return 404 with no data in mongoDB" , (done) => {
        var tempId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${tempId}`)
        .expect(404)
        .end(done);
    })

    it("Should return 404 with Invalid Object ID" , (done) => {
        var tempId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${tempId}56`)
        .expect(404)
        .end(done);
    })

});


describe('DELETE /todos:id', () => {

    it("Should delte todo.", (done) => {
        request(app)
        .delete(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
            expect(res.body.todo._id).toBe(todos[0]._id.toHexString());
        })
        .end((err,res) => {
            if(err) return done(err);

            Todo.findById(todos[0]._id.toHexString())
                .then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e))

        });
        
        


    });

    it("Should return 404 with no data in mongoDB" , (done) => {
        var tempId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${tempId}`)
        .expect(404)
        .end(done);
    })

    it("Should return 404 with invalid Object ID." , (done) => {
        var tempId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${tempId}56`)
        .expect(404)
        .end((done));
    })

});


describe('PATCH /todos:id', () => {
    it('should complete a todo', (done) => {
        
        var _id = todos[0]._id;

        var text = "complete first todo"
        var completed = true;

        request(app)
        .patch(`/todos/${_id}`)
        .send({text,
               completed})
        .expect(200)
        .expect((res) => {
            var localTodo = res.body.todo;
            expect(localTodo.text).toBe(text);
            expect(localTodo.completed).toBe(true);
            expect(localTodo.completedAt).toBeA('number');
        })
        .end(done);

        
    });


    it('should clear a completed todo to a new todo', (done) => {
        
        var _id = todos[1]._id;

        var completed = false;

        request(app)
        .patch(`/todos/${_id}`)
        .send({completed})
        .expect(200)
        .expect((res) => {
            var localTodo = res.body.todo;
            expect(localTodo.completed).toBe(false);
            expect(localTodo.completedAt).toNotExist();
        })
        .end(done);

        
    });


});


describe('GET /users/me', ()=> {

    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {

        request(app)
            .get('/users/me')
            .set('x-auth','')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({})
            })
            .end(done);
    });

});

describe('POST /users', () => {

    it('should crate a user', (done) => {
        var email = 'rama@exammple.com';
        var password = '123asdf!';

        request(app)
            .post('/users')
            .send({email,password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
                expect(res.body.password).toNotBe(password);
            })
            .end((err) => {
                if(err) return done(err);

                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create a user with invalid email', (done) => {
        var email = 'xammple.com';
        var password = '123asdf!';

        request(app)
            .post('/users')
            .send({email,password})
            .expect(400)
            .end(done)
        });

        it('should not create a user with email already exisists', (done) => {
            var email = 'rama_bala@vfc.com';
            var password = '123asdf!';
    
            request(app)
                .post('/users')
                .send({email,password})
                .expect(400)
                .end(done)
            });
})


describe('POST /users/login' , () => {

    it('Should login and return auth token', (done) => {
        request(app)
           .post('/users/login')
           .send({
               email: users[1].email,
               password: users[1].password
           })
           .expect(200)
           .expect((res) => {
               expect(res.headers['x-auth']).toExist();
           })
           .end((err,res) => {
               if(err) return done(err);

               User.findById(users[1]._id).then((user) => {
                   expect(user.tokens[0]).toInclude({
                       access: 'auth',
                       token: res.headers['x-auth']
                   });
                   done();
               }).catch((e) => done(e));
           });
    });

    it('Should not login with invalid creds', (done) => {
        request(app)
           .post('/users/login')
           .send({
               email: users[1].email,
               password: users[1].password+"extra"
           })
           .expect(400)
           .expect((res) => {
               expect(res.headers['x-auth']).toNotExist();
           })
           .end((err,res) => {
               if(err) return done(err);

               User.findById(users[1]._id).then((user) => {
                   expect(user.tokens.length).toBe(0);
                   done();
               }).catch((e) => done(e));
           });
    });





})