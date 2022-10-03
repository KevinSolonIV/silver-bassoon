const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comments = require("../models/Comment");
const Pictures = require("../models/Picture");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comments.find({post: req.params.id});
      const pictures = await Pictures.find({post: req.params.id});
      
      res.render("post.ejs", { post, user: req.user, comments, pictures });
      
      // viewCommentsBtn.addEventListener('click', () => {
      //   const commentsSection = Document.querySelector('.post-reply-comments');
      //   const picturesSection = Document.querySelector('.post-reply-pictures');
      //   const viewCommentsBtn = Document.querySelector('.set-comments-active');
      //   const viewPicturesBtn = Document.querySelector('.set-pictures-active');
      //   viewCommentsBtn.classList.toggle('active', true);
      //   commentsSection.classList.toggle('closed', false);
      //   commentsSection.classList.toggle('opened', true);
      //   viewPicturesBtn.classList.toggle('active', false);
      //   picturesSection.classList.toggle('opened', false);
      //   picturesSection.classList.toggle('closed', true);
      // });
      // viewPicturesBtn.addEventListener('click', () => {
      //   const commentsSection = Document.querySelector('.post-reply-comments');
      //   const picturesSection = Document.querySelector('.post-reply-pictures');
      //   const viewCommentsBtn = Document.querySelector('.set-comments-active');
      //   const viewPicturesBtn = Document.querySelector('.set-pictures-active');
      //   viewPicturesBtn.classList.toggle('active', true);
      //   picturesSection.classList.toggle('closed', false);
      //   picturesSection.classList.toggle('opened', true);
      //   viewCommentsBtn.classList.toggle('active', false);
      //   commentsSection.classList.toggle('opened', false);
      //   commentsSection.classList.toggle('closed', true);
      // });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        address: req.body.address,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
