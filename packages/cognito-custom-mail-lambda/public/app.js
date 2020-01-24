"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_mailer_1 = require("./mailer/custom-mailer");
exports.cognitoCustomMailerHandler = (event, context, callback) => custom_mailer_1.customMailer(event, context, callback);
