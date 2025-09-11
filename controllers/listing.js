const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
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
  console.log("working");
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
