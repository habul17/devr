const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xyz"

    if (!isAdminAuthorized) {
        res.status(401).send("You are not admin");
    } else {
        console.log("Admin Auth is Verified");

        next();
    }
}

const userAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xyz"

    if (!isAdminAuthorized) {
        res.status(401).send("You are not admin");
    } else {
        console.log("Admin Auth is Verified");

        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}