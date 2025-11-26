app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  const [bookmarks] = await db.query(`
    SELECT b.id, b.title, b.description, b.image_url, t.name AS tag_name
    FROM bookmarks b
    LEFT JOIN tags t ON b.tag_id = t.id
    WHERE b.delete_flag = 0
    ORDER BY b.id DESC
  `);
  const [tags] = await db.query(`SELECT * FROM tags ORDER BY name`);
  res.render("index", { bookmarks, tags });
});
