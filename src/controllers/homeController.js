export function showHome(req, res) {
  res.status(200).render("pages/home", {
    title: "Home"
  });
}