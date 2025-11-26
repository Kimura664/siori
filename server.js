import express from "express";
import { db } from "./DB/DB.js";

const app = express();

// Pug設定
app.set("view engine", "pug");
app.set("views", "./views");

// public 配下を静的ファイルとして公開
app.use(express.static("public"));

// ルート
app.get("/", async (req, res) => {
  try {
    // しおり一覧
    const [bookmarks] = await db.query(`
      SELECT b.id, b.title, b.description, b.image_url, t.name AS tag_name
      FROM bookmarks b
      LEFT JOIN tags t ON b.tag_id = t.id
      WHERE b.delete_flag = 0
      ORDER BY b.id DESC
    `);

    // タグ一覧
    let [tags] = await db.query(`SELECT id, name FROM tags ORDER BY name`);
    if (!tags) tags = [];

    res.render("index", { bookmarks, tags });
  } catch (err) {
    console.error(err);
    res.status(500).send("サーバーエラー");
  }
});

// サーバー起動
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
