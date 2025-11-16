import { useOutletContext, useParams } from 'react-router';

const Blog = () => {
  const id = Number(useParams().id);
  const { blogs } = useOutletContext();

  const blog = blogs.find(b => b.id === id);

  const formatDate = (date) => {
    const formattedDate = new Date(date).toDateString();
    return formattedDate;
  };

  if (!blog) return <h2>Not Found...</h2>;

  return (
    <>
      <h2>{blog.title}</h2>
      <div>
        <b>Author: </b>
        {blog.author}
      </div>
      <div>
        <b>URL: </b>
        <a
          href={`https://${blog.url}`}
          target='_blank'
        >
          {blog.url}
        </a>
      </div>
      <div>
        <b>Author: </b>
        {blog.author}
      </div>
      <div>
        <b>Date Added: </b>
        {formatDate(blog.date)}
      </div>
      <div>
        <b>Added by: </b>
        {blog.user.name}
      </div>
    </>
  )
}

export default Blog;