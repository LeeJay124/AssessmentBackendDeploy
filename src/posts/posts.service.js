const knex = require("../db/connection");


function create(post) {
return knex("posts")
  .insert(post)
  .returning("*")
  .then((createPost)=> createPost[0]);
}

function read(postId) {
  return knex("posts").select("*").where({ post_id: postId }).first();
}

function update(updatedPost) {
  return knex("posts")
  .select("*")
  .where({post_id: updatedPost.post_id})
  .update(updatedPost, ["post_body", "post_id", "post_title"])
  .then((data)=> data[0]);
}

function destroy(post_id) {
 return knex("posts").where({post_id}).del(); 
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
