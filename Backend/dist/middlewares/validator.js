import { body, validationResult } from "express-validator";
// we'll put all the validations inside it ,
// it will be an array of validation type
// The function iterates over each validation in the validations array.
// validation.run(req) runs the validation against the incoming request (req).
// In summary, this code is a middleware function for Express.js that runs a series of validations on an incoming request, stops on the first validation failure, and either proceeds to the next middleware if there are no errors or responds with the validation errors if there are any.
const validate = (validations) => {
    return async (req, res, next) => {
        //the function iterates over each validation in the validations array
        for (let validation of validations) {
            // we have send the request below we receive from the client
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        // validationResult(req) collects all the validation errors from the request.
        const errors = validationResult(req);
        // if there are no errors the below will run
        if (errors.isEmpty()) {
            return next();
        }
        //if errors exist then the below will work
        res.status(422).json({ errors: errors.array() });
    };
};
const signUpValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Email is required "),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should contain atleast 6 characters"),
];
const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required "),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should contain atleast 6 characters"),
];
const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];
export { validate, signUpValidator, loginValidator, chatCompletionValidator };
//# sourceMappingURL=validator.js.map