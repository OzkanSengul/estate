import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json({
    message: "Welcome to the POSTS API",
  });
  console.log("test");
});

export default router;
