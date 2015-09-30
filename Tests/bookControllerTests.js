var should = require('should'),
    sinon = require('sinon');

describe('Book Controller Tests', function () {
        describe('Post', function () {
            it('Should not allow a book without a title', function () {

                // initialize mock object for book API (save doesn't do anything)
                var Book = function (book) {
                    this.save = function () {
                    }
                };

                // create request
                var req = {
                    body: {
                        author: 'Test Author'
                    }
                };

                // use sinon to spy response
                var res = {
                    status: sinon.spy(),
                    send: sinon.spy()
                };

                // call method in controller to post
                var bookController = require('../Controllers/bookController')(Book);
                bookController.post(req, res);

                // assert the status and content show the error
                res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
                res.send.calledWith('Title is required').should.equal(true);
            })
        });
    }
);
