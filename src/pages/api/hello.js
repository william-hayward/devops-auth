// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
  secure: true,
});

export default async function handler(req, res) {
  res.status(200).json({name: "John Doe"});
  console.log(cloudinary.config());
  const image = await cloudinary.api.resources_by_asset_ids(
    ["3a279d1c4cce0bc50c4162c96e60cd27"][0]
  );
  console.log(image);
}
