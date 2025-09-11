const express = require("express");
const router = express.Router();
exports.router = router;
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListings } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListings,
    wrapAsync(listingController.createnewListing)
  );
//new route
router.get("/new", isLoggedIn, listingController.createnewListingForm);

router.get("/trending", async (req, res) => {
  const sections = [
    {
      title: "🏞️ Misty Hill Escapes",
      description:
        "Perfect for: Cozy retreats, nature walks, and hot chai with a view",
      places: [
        {
          name: "Munnar, Kerala",
          detail: "Lush tea gardens, misty mornings, and waterfall treks",
        },
        {
          name: "Mussoorie, Uttarakhand",
          detail: "Cable car rides, heritage strolls, and Kempty Falls",
        },
        {
          name: "Darjeeling, West Bengal",
          detail: "Sunrise at Tiger Hill and Himalayan Railway charm",
        },
      ],
    },
    // Add other sections here...
  ];
  res.render("filters/trending", { sections });
});

router
  .route("/:id")
  .get(wrapAsync(listingController.show))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListings,
    wrapAsync(listingController.update)
  )
  .delete(isOwner, isLoggedIn, wrapAsync(listingController.destroy));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
