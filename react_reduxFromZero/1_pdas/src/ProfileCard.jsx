const ProfileCard = (props) => {
  // JS FEATURE DESTRUCTING.
  const { title, handle, image, description } = props;
  return (
    <div
      className="card"
      style={{
        border: "2px solid black",
        padding: "2px 0",
        marginBottom: "5px",
      }}
    >
      <div className="card-image">
        <figure className="image is-1by1">
          <img src={image} alt="pda logo" />
        </figure>
      </div>

      <div className="card-content">
        <div className="media-content">
          <p className="title is-4"> {title}</p>
          <p className="subtitle is-6"> {handle}</p>
        </div>
        <div className="content">{description}</div>
      </div>
    </div>
  );
};

export default ProfileCard;
