const Listing = require("../models/listing.js");

// module.exports.index = async (req, res) => {
//   // const allListings = await Listing.find({});
//   // res.render("listings/index.ejs", { allListings });

//   const { category } = req.query;
//   let filter = {};

//   // If a category query parameter is passed, add it to the filter object
//   if (category) {
//     filter.category = category;
//   }
//   console.log("Incoming Filter Category:", category);
//   const allListings = await Listing.find(filter);
//   console.log("Filtered Listings:", allListings.length);
//   res.render("listings/index.ejs", { allListings, selectedCategory: category });
// };


module.exports.index = async (req, res) => {
  const { category, search } = req.query;
  let filter = {};

  // 1. Handle Category Filtering
  if (category) {
    filter.category = category;
  }

  // 2. Handle Country Search Filtering
  if (search) {
    // 'i' makes the search case-insensitive
    filter.country = { $regex: search.trim(), $options: "i" }; 
  }

  console.log("Current Database Query Filter:", filter);
  
  const allListings = await Listing.find(filter);
  
  // If a search returned empty results, let's send a flash message alert
  if (search && allListings.length === 0) {
    req.flash("error", `No listings found for "${search}"`);
    return res.redirect("/listings");
  }

  res.render("listings/index.ejs", { allListings, selectedCategory: category || "" });
};


module.exports.createnewListingForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createnewListing = async (req, res, next) => {
  const url = req.file.path;
  const filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "Added new listing successfully");
  res.redirect("/Listings");
};

module.exports.show = async (req, res) => {
  
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: "author",
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing doesn't exist");
    return res.redirect("/Listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing doesn't exist");
    return res.redirect("/Listings");
  }
  let originalImgUrl = listing.image.url;

  originalImgUrl = originalImgUrl.replace("/upload/w_250,blur_300");

  res.render("listings/edit.ejs", { listing, originalImgUrl });
};

module.exports.update = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true }
  );
  if (typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Updated listing successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.destroy = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Deleted listing successfully");
  res.redirect("/Listings");
};
