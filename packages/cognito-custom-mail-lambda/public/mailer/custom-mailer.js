"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./templates/index");
exports.customMailer = (event, _context, callback) => __awaiter(void 0, void 0, void 0, function* () {
    if (event.userPoolId === process.env.COGNITO_USERPOOL_ID && event.triggerSource === 'CustomMessage_ForgotPassword') {
        event.response.emailSubject = 'Reapit Foundations: Forgotten Password';
        const resetPasswordUrl = `${process.env.MARKET_PLACE_URL}/developer/reset-password`;
        event.response.emailMessage = yield index_1.forgotPasswordTemplate({
            verificationCode: event.request.codeParameter,
            userName: event.request.userAttributes.email,
            url: resetPasswordUrl,
        });
    }
    if (event.userPoolId === process.env.COGNITO_USERPOOL_ID && event.triggerSource === 'CustomMessage_SignUp') {
        event.response.emailSubject = 'Welcome to Reapit Foundations';
        const confirmRegistrationUrl = `${process.env.MARKET_PLACE_URL}/register/confirm`;
        event.response.emailMessage = yield index_1.confirmRegistrationTemplate({
            userName: event.request.userAttributes.email,
            url: confirmRegistrationUrl,
        });
    }
    callback(null, event);
});
