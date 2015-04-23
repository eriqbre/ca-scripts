/**
 * Created by ebreland on 4/19/15.
 */

var app = require('../app'),
    async = require('async'),
    changeLoadout = require('../requests/loadouts'),
    login = require('../requests/sequences/login-sequence'),
    setToon = require('../config/toon'),
    Task = require('../models/task'),
    _ = require('underscore');
