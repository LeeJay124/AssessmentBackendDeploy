const knex = require("../db/connection");

function list() {
return knex("comments").select("*");
}

function listCommenterCount() {
  return knex("comments as c")
  .join("users as u", "c.commenter_id", "u.user_id")
  .select("u.user_email as commenter_email")
  .count("c.comment")
  .groupBy("commenter_email")
  .orderBy("commenter_email");
}

function read(commentId) {
  return knex("comments as c")
  .join("posts as p", "c.post_id", "p.post_id")
  .join("users as u", "c.commenter_id", "u.user_id")
  .select("c.comment_id", "c.comment", "u.user_email as commenter_email", "p.post_body as commented_post")
  .where({"comment_id": commentId})
  .first();
 
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
