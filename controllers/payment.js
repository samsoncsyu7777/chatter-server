const stripe = require("stripe")(process.env.SECRET_KEY);
const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
var nodemailer = require('nodemailer');

// @route POST /payment/create-checkout-session
// @desc confirm order
// @access Public
exports.confirmOrder = asyncHandler(async (req, res, next) => {
  const { totalCost, order } = req.body;
  const orderId = Math.floor(Math.random() * 1000000);
  const orderString = JSON.stringify(order);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: 'Chatter Sushi',
          },
          unit_amount: totalCost,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://chattersushi.com/success/' + orderId,
    cancel_url: 'https://chattersushi.com/cancel',
  });

  if (session.url) {
    const newOrder = await Order.create({
      totalCost,
      orderId,
      order: orderString
    });

    res
      .status(200)
      .send({
        url: session.url,
      });
    
  }
});

// @route GET /payment/success
// @desc get success order
// @access Public
exports.getSuccessOrder = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const order = await Order.findOneAndUpdate({ orderId: id }, { firstGet: true });
  if (order && !order.firstGet) {
    res
      .status(200)
      .send({
        order: order,
      });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sushichatter@gmail.com',
        pass: '51underhill'
      }
    });

    var mailOptions = {
      from: 'sushichatter@gmail.com',
      to: 'sushichatter@gmail.com',
      subject: 'New Order: ' + order.orderId,
      text: JSON.stringify(order)
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }
});