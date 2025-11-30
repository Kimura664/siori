import express from "express";
import { db } from "../../DB/DB.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// 画像アップロード設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// しおり一覧
router.get("/", async (req, res) => {
  const [bookmarks] = await db.query(`
    SELECT b.id, b.title, b.description, b.image_url, t.name AS tag_name
    FROM bookmarks b
    LEFT JOIN tags t ON b.tag_id = t.id
    ORDER BY b.id DESC
  `);
  res.render("admin/bookmarks", { bookmarks });
});

// 追加フォーム
router.get("/new", async (req, res) => {
  const [tags] = await db.query(`SELECT id, name FROM tags ORDER BY name`);
  res.render("admin/bookmarks_new", { tags });
});

// 追加処理
router.post("/new", upload.single("image"), async (req, res) => {
  const { title, description, tag_id } = req.body;
  const image_url = req.file ? "/uploads/" + req.file.filename : null;

  await db.query(
    `INSERT INTO bookmarks (title, description, tag_id, image_url) VALUES (?, ?, ?, ?)`,
    [title, description, tag_id, image_url]
  );

  res.redirect("/admin/bookmarks");
});

export default router;
