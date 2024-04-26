const Company = require("../model/companyModel");
const catchAsync = require("../utils/catchAsync");
const { validationResult } = require('express-validator');

function validateAndMapData(reqBody) {
  const validFields = [
    "img",
    "Overview",
    "Website",
    "Industry",
    "Company size",
    "Headquarters",
    "Founded",
    "Specialties",
    "name",
    "Phone",
  ];

  const mappedFields = {
    desc: reqBody.Overview || "",
    name: reqBody.name || "",
    website: reqBody.Website || "",
    founded: reqBody.Founded || "",
    hq: reqBody.Headquarters || "",
    emp: reqBody["Company size"] || "",
    desc: reqBody.Overview || "",
    img: reqBody.img || "",
    category: reqBody.Industry || "",
    phone: reqBody.Phone || "",
    specs: reqBody.Specialties ? reqBody.Specialties.split(", ") : [],
  };
  const keys = Object.keys(reqBody);
  console.log(reqBody, mappedFields);
  for (let key of keys) {
    if (!validFields.includes(key)) {
      return { error: `Invalid field: ${key}` };
    }
    if (
      reqBody[key] === undefined ||
      reqBody[key] === null ||
      reqBody[key] === ""
    ) {
      delete mappedFields[key];
    }
  }

  return mappedFields;
}

exports.addCompany = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const mappedData = validateAndMapData(req.body);
  if (!mappedData.name || !mappedData.Website) {
    return res.status(400).json({ error: "Incomplete request" });
  }

  try {
    const newUser = await Company.create(mappedData);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(422).json({ error: "Company already exists" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.getCompany = catchAsync(async (req, res, next) => {
  const page = req.query.page || 0; // Default to page 0 if not provided
  const limit = 10;
  const skip = page * limit;

  try {
    const total = await Company.countDocuments();
    const companies = await Company.find({}).skip(skip).limit(limit);
    res.status(200).json({
      status: "success",
      total,
      data: companies,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.deleteCompany = catchAsync(async (req, res, next) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Invalid or missing IDs" });
  }

  try {
    await Company.deleteMany({ _id: ids });
    res.status(200).json({ msg: "Deleted Successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
