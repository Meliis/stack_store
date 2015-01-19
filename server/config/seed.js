/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Product = require('../api/product/product.model');
var User = require('../api/user/user.model');
var Category = require('../api/category/category.model');
var Review = require('../api/review/review.model');
var Order = require('../api/order/order.model');

Product.find({}).remove(function() {
  Product.create({
    name: "Free Time",
    price: 100.00,
    description: {blurb: "Dis be a blurb", full: "For when you're out of the real stuff"},
    categories: ["54b54dbd356afaad0411ed12", "54b54dbd356afaad0411ed14"],
    images: [], 
    reviews: [],
    quantity: 10000
  }, {
    name: "Borrowed Time",
    price: 250.00,
    description: {blurb: "Dis be a blurb", full: "Not always recommended"},
    categories: ["54b54dbd356afaad0411ed12", "54b54dbd356afaad0411ed14"],
    images: [], 
    reviews: [],
    quantity: 4000
  }, {
    name: "Work Time",
    price: 800.00,
    description: {blurb: "Dis be a blurb", full: "Recommended for workaholics"},
    categories: ["54b54dbd356afaad0411ed12", "54b54dbd356afaad0411ed15"],
    images: [], 
    reviews: [],
    quantity: 100000
  }, {
    name: "Hammer Time",
    price: 10000.00,
    description: {blurb: "Dis be a blurb", full: "Very rare. For more information, visit youtube"},
    categories: ["54b54dbd356afaad0411ed12"],
    images: [], 
    reviews: [],
    quantity: 1
  }, {
    name: "Adventure Time",
    price: 50.00,
    description: {blurb: "Dis be a blurb", full: "Like the show, but better"},
    categories: ["54b54dbd356afaad0411ed12"],
    images: [], 
    reviews: [],
    quantity: 3000
  }, {
    name: "Leisure Time",
    price: 725.00,
    description: {blurb: "Dis be a blurb", full: "Great for people who need a break"},
    categories: ["54b54dbd356afaad0411ed12", "54b54dbd356afaad0411ed14"],
    images: [], 
    reviews: [],
    quantity: 7000
  }, {
    name: "Lunch Time",
    price: 30.00,
    description: {blurb: "Dis be a blurb", full: "For those who hunger"},
    categories: ["54b54dbd356afaad0411ed12"],
    images: [], 
    reviews: [],
    quantity: 100000
  }, {
    name: "Nap Time",
    price: 125.00,
    description: {blurb: "Dis be a blurb", full: "Perfect for a hot summer day"},
    categories: ["54b54dbd356afaad0411ed12"],
    images: [], 
    reviews: [],
    quantity: 80000
  }, function() {
      console.log('finished populating products');
    }
  );
});

Category.find({}).remove(function() {
  Category.create({
    name: "Popular",
    products: []
  }, {
    name: "Rare",
    products: []
  }, {
    name: "Multipurpose",
    products: []
  }, {
    name: "Occupational",
    products: []
  }, function() {
      console.log('finished populating categories');
    }
  );
});


Review.find({}).remove(function() {
  Review.create({
    userId: 1,
    productId: 1,
    stars: 5,
    date: new Date(),
    title: "Best decision ever",
    body: "I cannot remember the last time I had such high quality adventure time. What a treat!"
  }, {
    userId: 1,
    productId: 1,
    stars: 5,
    date: new Date(),
    title: "Had the time of my life",
    body: "I'm a strong supporter of this company. The BuyTime team is the best."
  }, {
    userId: 1,
    productId: 1,
    stars: 5,
    date: new Date(),
    title: "Best decision ever",
    body: "I cannot remember the last time I had such high quality adventure time. What a treat!"
  }, {
    userId: 1,
    productId: 1,
    stars: 5,
    date: new Date(),
    title: "Had the time of my life",
    body: "I'm a strong supporter of this company. The BuyTime team is the best."
  },{
    userId: 1,
    productId: 1,
    stars: 5,
    date: new Date(),
    title: "Best decision ever",
    body: "I cannot remember the last time I had such high quality adventure time. What a treat!"
  }, {
    userId: 1,
    productId: 1,
    stars: 5,
    date: new Date(),
    title: "Had the time of my life",
    body: "I'm a strong supporter of this company. The BuyTime team is the best."
  },{
    userId: 1,
    productId: 1,
    stars: 5,
    date: new Date(),
    title: "Best decision ever",
    body: "I cannot remember the last time I had such high quality adventure time. What a treat!"
  }, {
    userId: 1,
    productId: 1,
    stars: 5,
    date: new Date(),
    title: "Had the time of my life",
    body: "I'm a strong supporter of this company. The BuyTime team is the best."
  },{
    userId: 1,
    productId: 1,
    stars: 5,
    date: new Date(),
    title: "Best decision ever",
    body: "I cannot remember the last time I had such high quality adventure time. What a treat!"
  }, {
    userId: 1,
    productId: 1,
    stars: 5,
    date: new Date(),
    title: "Had the time of my life",
    body: "I'm a strong supporter of this company. The BuyTime team is the best."
  },{
    userId: 1,
    productId: 1,
    stars: 5,
    date: new Date(),
    title: "Best decision ever",
    body: "I cannot remember the last time I had such high quality adventure time. What a treat!"
  }, {
    userId: 1,
    productId: 1,
    stars: 5,
    date: new Date(),
    title: "Had the time of my life",
    body: "I'm a strong supporter of this company. The BuyTime team is the best."
  }, function() {
      console.log('finished populating categories');
    }
  );
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    orders: ["54bc04d4af33050e1bdaca16"]
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
