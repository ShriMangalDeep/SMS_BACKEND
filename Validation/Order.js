import joi from '@hapi/joi';

export const orderValidationschema = joi.object({
    customername: joi.string()
        .label("Customer Name")
        .min(5)
        .lowercase()
        .max(100)
        .required()
        .regex(/[${};<>`]/, { invert: true })
        .trim()
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        }),
    phonenumber: joi.string()
        .label("Customer Phone Number")
        .required()
        .regex(/^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/) // regex for handling phonw number with country codes if passed
        .messages({
            "string.pattern.base": `{{#label}} is not valid`
        })
        .trim(),
    productname: joi.string()
        .label("Product Name")
        .min(5)
        .lowercase()
        .max(100)
        .required()
        .regex(/[${};<>`]/, { invert: true })
        .trim()
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        }),
    message: joi.string()
        .label("Order Message")
        .allow('')
        .min(5)
        .lowercase()
        .max(300)
        .regex(/[${};<>`]/, { invert: true })
        .trim()
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        }),
    purchasedate: joi.date()
        .label("Order Purchase Date")
        .iso()
        .default(new Date()),
    orderstatus: joi.string()
        .label("Order Status")
        .valid('paid', 'unpaid', 'new')
        .lowercase()
        .trim()
        .required()
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        }),
    metal: joi.string()
        .label("Product Metal Type")
        .valid('gold', 'silver', 'platinum', 'imitation')
        .lowercase()
        .trim()
        .required()
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        }),
    productweight: joi.number()
        .label("Metal Weight")
        .positive()
        .greater(0)
        .required(),
    metalpurity: joi.string()
        .label("Product Metal Purity")
        .trim()
        .uppercase()
        //if metal is gold than only KT unit is used otherwise use 100%
        .when('metal', { is: "gold", then: joi.valid('18KT', '22KT', '24KT').required(), otherwise: joi.valid('100%').default("100%") })
        .regex(/[${};<>`]/, { invert: true })
        .messages({
            "string.pattern.invert.base": `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` + " '`' )"
        }),
    purchaseprice: joi.number()
        .label("Purchase Price")
        .greater(0)
        .positive()
        .required(),
    labour: joi.number()
        .label("Labour Cost")
        .greater(0)
        .positive()
        .required(),
    extra: joi.number()
        .label("Extra Cost")
        .greater(-1)
        .required(),
    rate: joi.number()
        .label("Todays Rate")
        .greater(0)
        .positive()
        .required(),
    transaction: joi.array()
        .label("Transaction's")
        .items(
            {
                transactiondate:joi.date()
                    .label("Transaction Date")
                    .iso(),
                amount:joi.number()
                .label("Transaction Amount")
                    .greater(0)
                    .positive()
                    .required(),
            }
        )
        .label("Transaction list")
        .default([])
})

