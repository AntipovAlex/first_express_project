"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const types_1 = require("../types");
const titleValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res
            .status(types_1.HTTP_STATUS.BAD_REQUEST_400)
            .json({ errors: errors.array() });
    }
    else {
        return next();
    }
};
exports.titleValidationMiddleware = titleValidationMiddleware;
