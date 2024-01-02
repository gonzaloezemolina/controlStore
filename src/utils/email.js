import __dirname from "./utils.js"

export default{
    purchase: {
        subject: `Gracias por tu compra ${req.user.firstName}`,
        attachments: [
          {
            filename: "logo.png",
            path: `${__dirname}/public/img/logo.png`,
            cid: "logo",
          },
        ],
      },
}