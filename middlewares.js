import routes from "./routes";

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "Four Top";
    res.locals.routes = routes;
    next();
}