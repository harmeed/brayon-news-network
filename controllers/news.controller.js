const News = require("../models/news.models");
const User = require("../models/user.models");

exports.postNews = async (req, res) => {
  const { title, body_of_news } = req.body;
  try {
    const id = req.user._id;
    console.log(id);
    const user = await User.findById({ _id: id });
    console.log(
      user,
      "==============================================================================="
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const news = await News.create({ title: title, body_of_news });
    return res.status(201).json({ message: "news created successfully", news });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating news" });
  }
};

exports.updateExistingNews = async (req, res) => {
  try {
    const { title, body_of_news } = req.body;
    const id = req.user._id;

    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(200).json({ message: "user does not exist" });
    }
    const update_news = await News.findOneAndUpdate(
      {
        useerId: req.params.id,
      },
      { title, body_of_news },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "updated successfully", update_news });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await News.find();
    return res.status(200).json({ message: "successful", news: news });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

exports.getNewsByTitle = async (req, res) => {
  try {
    const news = await News.find({ title: req.params.title });
    return res.status(200).json({ message: "Found NewsTitle", news });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const news = await News.findOneAndDelete({
      _id: req.params.id,
    });
    return res.status(201).json({ message: "news deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
