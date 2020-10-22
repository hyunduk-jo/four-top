//import { videosDB } from "../../db";
import routes from "../../routes"
import Video from "../../models/Video";

export const home = async (req, res) => {//async는 특정 부분(await)을 기다려줌
  try {
    const videosDB = await Video.find({}).sort({ _id: -1 });//끝나기 전 까지 아랫 줄 실행X, look for Video
    res.render("home", { pageTitle: "Home", videosDB });//윗 줄 끝나야 실행O
  } catch (error) {
    console.log(error)
    res.render("home", { pageTitle: "Home", videosDB: [] });
  }
}
export const search = async (req, res) => {
  const { query: { term: searchingBy } } = req;
  let videosDB = []
  try {
    videosDB = await Video.find({ title: { $regex: searchingBy, $options: "i" } });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videosDB });
}
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
}

export const postUpload = async (req, res) => {
  const {

    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id              //creator가 있게 비디오를 생성
  });
  req.user.videos.push(newVideo.id);     //비디오 id를 비디오 안에 넣음
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id))
}


export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    //console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    //console.log(error);
    res.redirect(routes.home);
  }
}
export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video })
    }
  } catch (error) {
    res.redirect(routes.home);
  }
  res.render("editVideo", { pageTitle: "Edit Video" });
}
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home)
  }
}
export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
}

export const videos = (req, res) => res.render("videos", { pageTitle: "Videos" });