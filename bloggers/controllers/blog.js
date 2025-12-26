const Blog = require("../models/blog");
// const user = require("../models/user");/
const authMiddleware=require("../middleware/authMiddleware");

const createBlog = async (req, res) => {
  try {
    const { title, description, images, tags } = req.body;
    const userId = req.user._id;
    console.log("Creating blog for user ID:", userId);
    const newBlog = new Blog({
      title,
      description,
      images,
      tags,
      createdBy: req.user._id,
      date: req.body.date || Date.now(),
    });
    await newBlog.save();
    console.log("Blog created successfully:", newBlog);
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog", error });
  }
};

const deleteBlog = async (req, res) => {
  // Implementation for deleting a blog
  const id = req.params.id;
  const userId = req.user._id;
  try {
    const blogToDelete = await Blog.findById(id);
    if (!blogToDelete) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blogToDelete.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this blog" });
    }
    const deletedBlog = await Blog.findByIdAndDelete(id);
    console.log("Blog deleted successfully:", deletedBlog);
    res.status(200).json({ message: "Blog deleted successfully", deletedBlog });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog", error });
  }

};

const updateBlog = async(req,res)=>{
    const id = req.params.id;
      const userId = req.user._id;
        // Implementation for updating a blog
        try {
            const blogToUpdate = await Blog.findById(id);
            if (!blogToUpdate) {
              return res.status(404).json({ message: "Blog not found" });
            }
            if (blogToUpdate.createdBy.toString() !== userId.toString()) {  
                return res.status(403).json({ message: "Unauthorized to update this blog" });
            }
            const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
            console.log("Blog updated successfully:", updatedBlog);
            res.status(200).json({ message: "Blog updated successfully", updatedBlog });
          } catch (error) {
            console.error("Error updating blog:", error);
            res.status(500).json({ message: "Error updating blog", error });
          }
}

module.exports = { createBlog, deleteBlog, updateBlog };