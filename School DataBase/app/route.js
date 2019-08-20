module.exports = function (app) {

  var student = require('./student');
  app.post('/createStudent', student.createStudent);
  app.get('/getStudent/:id', student.getStudent);
  app.post('/search', student.search);
  app.get('/removeStudent/:id', student.removeStudent);
  app.post('/updateStudent', student.updateStudent);
  app.get('/show/:id', student.show);

};
