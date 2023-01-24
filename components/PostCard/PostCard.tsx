import { FeaturedImage } from "components/FeaturedImage";
import { Post } from "graphql";
import Link from "next/link";

export interface PostCardProps {
  post: Post;
  className?: string;
}

const PostCard = ({ post, className }: PostCardProps) => {
  const { title, excerpt, uri, featuredImage, date } = post;

  const formattedDate = new Date(date ?? ``).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={`${
        className ? className : ``
      } flex flex-row gap-12 p-6 text-primary`}
    >
      <div className={`flex w-1/3 flex-col`}>
        <FeaturedImage
          image={featuredImage?.node}
          className={`w-full object-cover`}
        />
      </div>
      <div className={`flex w-2/3 flex-col gap-6`}>
        <h2 className={`font-heading text-4xl font-bold text-dark`}>{title}</h2>
        <p className={`font-body text-sm text-dark`}>{formattedDate}</p>
        <p className={`font-body text-sm text-dark`}>{excerpt}</p>
        <Link
          href={uri ?? ``}
          className={`font-body text-sm uppercase text-primary underline`}
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
