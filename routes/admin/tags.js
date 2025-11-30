import express from "express";
import { db } from "../../DB/DB.js";

const router = express.Router();

// タグ一覧
router.get("/", async (req, res) => {
  const [tags] = await db.query(`SELECT id, name FROM tags ORDER BY id DESC`);
  res.render("admin/tags", { tags });
});

// 追加フォーム
router.get("/new", (req, res) => {
  res.render("admin/tags_new");
});

// 追加処理
router.post("/new", async (req, res) => {
  const { name } = req.body;
  await db.query(`INSERT INTO tags (name) VALUES (?)`, [name]);
  res.redirect("/admin/tags");
});

export default router;
