const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("post_title", "post_body");

async function postExists(req, res, next) {
  const { postId } = req.params;

  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({data});
}

async function update(req, res) {
  const data = await service.update(req.body.data);
  res.json({ data });
}

async function destroy(req, res) {
  const {post} = res.locals;
  await service.delete(post.post_id);
  res.sendStatus(204);
}

module.exports = {
  create: [hasRequiredProperties, asyncErrorBoundary(create)],
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};
