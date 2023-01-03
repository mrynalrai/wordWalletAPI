const express = require('express');
const wordController = require('./../controllers/wordController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    wordController.getAllWords
  )
  .post(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    wordController.createWord
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    wordController.getWord
  )
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    wordController.updateWord
  )
  .delete(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    wordController.deleteWord
  );
// .delete(authController.protect, authController.restrictTo('admin'), wordController.deleteWord);

module.exports = router;
