import express from "express";
import { adsclick, getAds, impressions, postAds, random } from "../controller/adsController.js";

const router = express.Router();

router.route("/ads").post(postAds)
router.route("/getads").get(getAds)
router.route("/ads/impression/:id").post(impressions)
router.route("/ads/click/:id").post(adsclick)
router.route("/ads/random").get(random)


export default router;