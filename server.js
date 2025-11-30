import express from "express";
import { db } from "./DB/DB.js";
import path from "path";
import adminBookmarksRouter from "./routes/admin/bookmarks.js";
import adminTagsRouter from "./routes/admin/tags.js"; // ← ここでインポート

const app = express();

// Pug設定
app.set("view engine", "pug");
app.set("views", "./views");

// ミドルウェア
app.use(express.urlencoded({ extended: true })); // フォーム送信対応
app.use(express.json());
app.use(express.static("public"));               // CSS / 画像

// =====================================================
// ------------------------- ルート ----------------------
// =====================================================

// --- トップページ ---
app.get("/", async (req, res) => {
  const [bookmarks] = await db.query(`
    SELECT b.id, b.title, b.description, b.image_url, t.name AS tag_name
    FROM bookmarks b
    LEFT JOIN tags t ON b.tag_id = t.id
    WHERE b.delete_flag = 0
    ORDER BY b.id DESC
  `);

  let [tags] = await db.query(`SELECT id, name FROM tags ORDER BY name`);
  if (!tags) tags = [];

  res.render("index", { bookmarks, tags });
});

// --- 管理者ルート ---
app.use("/admin/bookmarks", adminBookmarksRouter);
app.use("/admin/tags", adminTagsRouter);

// 管理者トップページ
app.get("/admin", (req, res) => {
  res.render("admin/index");
});

// =====================================================
app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
