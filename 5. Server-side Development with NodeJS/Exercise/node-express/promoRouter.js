'use strict';

module.exports = function (eRouter, bodyParser, callback) {
    try {
        //set bodyParser
        eRouter.use(bodyParser.json());

        //implement CRUD operation for eg.:"/promotions"
        eRouter.route('/')
			.all(function (req, res, next) {
			    res.writeHead(200, { 'Content-Type': 'text/plain' });
			    next();
			})
			.get(function (req, res, next) {
			    res.end('Will send all the promotions to you!');
			})
			.post(function (req, res, next) {
			    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
			})
			.delete(function (req, res, next) {
			    res.end('Deleting all promotions');
			});

        //implement CRUD operation for eg.:"/promotions/:id"
        eRouter.route('/:id')
			/* I wanted to implement this method because I tried using [POST (http://localhost:3000/promotions/123)] with postman 
			 * but server doesn't return any response, the assignment did not say to implement the POST method and so I've only 
			 * tried and commented
			 */
			//.post(function(req,res,next){
			//	res.writeHead(400, { 'Content-Type': 'text/plain' });
			//	res.end("Bad request");
			//})
			.all(function (req, res, next) {
			    res.writeHead(200, { 'Content-Type': 'text/plain' });
			    next();
			})
			.get(function (req, res, next) {
			    res.end('Will send details of the promotion: ' + req.params.id + ' to you!');
			})
			.put(function (req, res, next) {
			    res.write('Updating the promotion: ' + req.params.id + '\n');
			    res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
			})
			.delete(function (req, res, next) {
			    res.end('Deleting promotion: ' + req.params.id);
			});

        callback(null, {
            init: function (app, webUrl) {
                return app.use(webUrl, eRouter);
            }
        });
    }
    catch (error) {
        callback(error, null);
    }
}
