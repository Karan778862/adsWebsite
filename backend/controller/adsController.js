import Add from "../model/AdSchema.js";
import Click from "../model/clickSchema.js";

//  ads post
export const postAds = async (req, res) => {
  const { title, imageUrl, targetUrl, impressions, clicks } = req.body;
  if (!title || !imageUrl || !targetUrl) {
    return res.status(201).json({
      message: "All fields are required",
      success: false,
    });
  }

  await Add.create({
    title,
    imageUrl,
    targetUrl,
    impressions,
    clicks,
  });
  return res.status(200).json({
    message: "uploading ",
    success: true,
  });
};

//ads get
export const getAds = async (req, res) => {
  try {
    const getads = await Add.find();

    return res.status(200).json(getads);
  } catch (error) {
    console.log(error);
  }
};

///ads/impression/:id

export const impressions = async (req, res) => {
  const id = req.params.id;
  const ad = await Add.findById(id);

  if (!ad) {
    return res.status(404).json({
      message: "ad not found",
      success: false,
    });
  }

  await Add.findByIdAndUpdate(id, { $inc: { impressions: 1 } });

  return res.status(200).json({
    message: "impression recoded",
    success: true,
  });
};

//'/ads/click/:id'

export const adsclick = async (req, res) => {
  try {
    const adId = req.params.id;
    const userIp = req.ip;
    console.log(userIp);

    const exitingClick = await Click.findOne({
      adId,
      userIp,
      createdAt: { $gte: Date.now() - 10 * 60 * 100 },
    });

    if (exitingClick) {
      res.status(403).json({
        message: "too many click detected",
        success: false,
      });
    }

    const newClick = await Click.create({
      adId,
      userIp,
    });

    await Click.findByIdAndUpdate(adId, { $push: { clicks: newClick._id } });
    return res.status(200).json({
      message: "click recoded",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};




//random api

export const random = async (req, res) => {
  try {
    const ad = await Add.find().populate("clicks");

    

    if (ad.length === 0) {
      return res.status(403).json({
        message: "no ads avilable",
      });
    }

    const randomAd = ad[Math.floor(Math.random() * ad.length)];
    res.json({
      _id:randomAd._id,
      title:randomAd.title,
      imageUrl:randomAd.imageUrl,
      targetUrl:randomAd.targetUrl,
      impressions:randomAd.impressions,
      clicks:randomAd.clicks.length,
    })

    await Add.findByIdAndUpdate(randomAd._id, { $inc: { impressions: 1 } });

    return res.status(200).json({ randomAd });
  } catch (error) {
    console.log(error.message);
  }
};
