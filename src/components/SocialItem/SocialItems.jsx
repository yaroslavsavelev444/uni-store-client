import SocialItem from "./SocialItem";
import "./SocialItem.css";

export default function SocialItems({ links, edit }) {
  if (!links) return <h4>---</h4>;

  return (
    <div className="social-items">
      {links.length > 0 ? (
        links.map((link) => (
          <SocialItem key={link._id} link={link} edit={edit} />
        ))
      ) : (
        <h4>---</h4>
      )}
    </div>
  );
}