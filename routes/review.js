const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/review.js");
const {
  validateReviews,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

//create review route
router.post(
  "/",
  isLoggedIn,
  validateReviews,
  wrapAsync(reviewController.create)
);

//delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroy)
);

module.exports = router;
