export default function devUser(req, res, next) {
  // TEMP: user id fixe (ou via header)
  // const userId = Number(req.headers["x-user-id"]) || 1;

  req.user = { id: 1 };
  next();
}
