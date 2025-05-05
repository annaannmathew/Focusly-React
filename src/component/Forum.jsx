import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Forum.css";

const Forum = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8085/forum/all");
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(sorted);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts.");
    }
  };

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setError("You must be logged in to post.");
      return;
    }

    try {
      await axios.post("http://localhost:8085/forum/create", {
        ...newPost,
        userId,
      });
      setNewPost({ title: "", content: "" });
      fetchPosts();
    } catch (err) {
      console.error(err);
      setError("Error posting message.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this post?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8085/forum/delete/${id}`);
      fetchPosts();
    } catch (err) {
      console.error(err);
      setError("Failed to delete post.");
    }
  };

  return (
    <div className="forum-container">
      <h2>Community Forum</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="forum-form">
        <input
          name="title"
          placeholder="Post title"
          value={newPost.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="What's on your mind?"
          value={newPost.content}
          onChange={handleChange}
          required
        />
        <button type="submit">Post</button>
      </form>

      <div className="forum-posts">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>
                Posted on {new Date(post.createdAt).toLocaleString()}
              </small>
              {userId === post.userId && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Forum;
