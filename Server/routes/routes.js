var express = require('express');
var user = require('../methods/user');
var draw = require('../methods/draw');

/* RESTFUL routing */
var router = express.Router();
/* log */
router.post('/authenticate', user.onAuthenticate);

/* Create */
router.post('/register', user.onUserRegister);
router.post('/', user.onUserCreate);
router.post('/:username/draws', draw.onDrawCreate);

/* Read */
router.get('/', user.onUserGetAll);
router.get('/:username', user.onUserGet);
router.get('/:username/draws', draw.onDrawGetAll);

/* Update */
router.put('/:username/edit', user.onUserUpdate);

/* Delete */
router.delete('/:username', user.onUserDelete);

module.exports = router;