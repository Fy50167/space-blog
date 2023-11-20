import { Link } from 'react-router-dom';

const CommentList = ({
  comments,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {comments &&
        comments.map((comment) => (
          <div key={comment._id} className="">
            <h4 className="">
              {showUsername ? (
                <Link
                  className=""
                  to={`/profiles/${comment.commentAuthor}`}
                >
                  {comment.thoughtAuthor} <br />
                  <span className=''>
                    commented on {comment.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span className=''>
                    You commented on {comment.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="">
              <p>{comment.commentText}</p>
            </div>
            {/* put reaction form here */}
          </div>
        ))}
    </div>
  );
};

export default CommentList;