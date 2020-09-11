//import { videosDB } from "../../db";
import routes from "../../routes"
import Video from "../../models/Video";

export const home = async (req, res) => {//async는 특정 부분을 기다려줌
    try {
        const videosDB = await Video.find({});//끝나기 전 까지 아랫 줄 실행X
        res.render("home", { pageTitle: "Home", videosDB });//윗 줄 끝나야 실행O
    } catch (error) {
        console.log(error)
        res.render("home", { pageTitle: "Home", videosDB: [] });
    }
}
export const search = (req, res) => {
    const { query: { term: searchingBy } } = req;
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
        description
    });
    console.log(newVideo)
    res.redirect(routes.videoDetail(newVideo.id))
}


export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video" });
export const videos = (req, res) => res.render("videos", { pageTitle: "Videos" });