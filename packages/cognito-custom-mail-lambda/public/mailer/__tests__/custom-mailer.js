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
const custom_mailer_1 = require("../custom-mailer");
const index_1 = require("../templates/index");
const context = {};
describe('customMailer', () => {
    it('should just call the callback with the event if called when userPool does not match', () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.COGNITO_USERPOOL_ID = 'SOME_ID';
        const callback = jest.fn();
        const event = {
            triggerSource: 'CustomMessage_ForgotPassword',
            userPoolId: 'SOME_OTHER_ID',
            response: {},
            request: {},
        };
        yield custom_mailer_1.customMailer(event, context, callback);
        expect(event.response).toEqual({});
        expect(callback).toHaveBeenCalledWith(null, event);
    }));
    it('should just call the callback with the event if the userPool matches but no trigger source match', () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.COGNITO_USERPOOL_ID = 'SOME_ID';
        const callback = jest.fn();
        const event = {
            triggerSource: 'CreateAuthChallenge_Authentication',
            userPoolId: process.env.COGNITO_USERPOOL_ID,
            response: {},
            request: {},
        };
        yield custom_mailer_1.customMailer(event, context, callback);
        expect(event.response).toEqual({});
        expect(callback).toHaveBeenCalledWith(null, event);
    }));
    it('should call the callback with an updated event if the trigger ' + 'source is CustomMessage_ForgotPassword', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        process.env.COGNITO_USERPOOL_ID = 'SOME_ID';
        process.env.MARKET_PLACE_URL = 'SOME_URL';
        const callback = jest.fn();
        const event = {
            triggerSource: 'CustomMessage_ForgotPassword',
            userPoolId: process.env.COGNITO_USERPOOL_ID,
            response: {},
            request: {
                codeParameter: 'SOME_CODE',
                userAttributes: {
                    email: 'someone@bob.com',
                },
            },
        };
        yield custom_mailer_1.customMailer(event, context, callback);
        expect(event.response).toEqual({
            emailSubject: 'Reapit Foundations: Forgotten Password',
            emailMessage: yield index_1.forgotPasswordTemplate({
                verificationCode: (_a = event.request) === null || _a === void 0 ? void 0 : _a.codeParameter,
                userName: (_b = event.request) === null || _b === void 0 ? void 0 : _b.userAttributes.email,
                url: 'SOME_URL/developer/reset-password',
            }),
        });
        expect(callback).toHaveBeenCalledWith(null, event);
    }));
    it('should call the callback with an updated event if the trigger source is CustomMessage_SignUp', () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        process.env.COGNITO_USERPOOL_ID = 'SOME_ID';
        process.env.MARKET_PLACE_URL = 'SOME_URL';
        const callback = jest.fn();
        const event = {
            triggerSource: 'CustomMessage_SignUp',
            userPoolId: process.env.COGNITO_USERPOOL_ID,
            response: {},
            request: {
                codeParameter: 'SOME_CODE',
                userAttributes: {
                    email: 'someone@bob.com',
                },
            },
        };
        yield custom_mailer_1.customMailer(event, context, callback);
        expect(event.response).toEqual({
            emailSubject: 'Welcome to Reapit Foundations',
            emailMessage: yield index_1.confirmRegistrationTemplate({
                userName: (_c = event.request) === null || _c === void 0 ? void 0 : _c.userAttributes.email,
                url: 'SOME_URL/register/confirm',
            }),
        });
        expect(callback).toHaveBeenCalledWith(null, event);
    }));
    afterEach(() => {
        jest.resetAllMocks();
    });
});
