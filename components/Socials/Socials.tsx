import { SeoSocial } from "graphql";
import { BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

export interface SocialsProps {
  socials: SeoSocial;
}

interface SocialIconProps {
  social: string;
}

const SocialIcon = ({ social }: SocialIconProps) => {
  if (!social) return null;
  // contains instagram
  if (social?.includes("instagram")) {
    return <BsInstagram className={`text-2xl text-primary`} />;
  }
  // contains youtube
  if (social.includes("youtube")) {
    return <FaYoutube className={`text-2xl text-primary`} />;
  }
  // contains linkedin
  if (social.includes("linkedin")) {
    return <BsLinkedin className={`text-2xl text-primary`} />;
  }

  return null;
};

const Socials = ({ socials }: SocialsProps) => {
  return (
    <div className={`flex flex-row items-center gap-4`}>
      {/* Facebook */}
      {socials.facebook && socials.facebook.url ? (
        <a
          href={socials.facebook.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-row items-center rounded-full bg-white p-2 hover:bg-secondary-light`}
        >
          <FaFacebookF className={`text-2xl text-primary`} />
        </a>
      ) : null}
      {/* Twitter */}
      {socials.twitter && socials.twitter.username ? (
        <a
          href={`https://twitter.com/${socials.twitter.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-row items-center rounded-full bg-white p-2 hover:bg-secondary-light`}
        >
          <BsTwitter className={`text-2xl text-primary`} />
        </a>
      ) : null}
      {/* otherSocials */}
      {socials.otherSocials && socials.otherSocials.length > 0
        ? socials.otherSocials.map((social, index) => {
            return (
              <a
                key={index}
                target="_blank"
                href={social as string}
                rel="noopener noreferrer"
                className={`flex flex-row items-center rounded-full bg-white p-2 hover:bg-secondary-light`}
              >
                <SocialIcon social={social as string} />
              </a>
            );
          })
        : null}
    </div>
  );
};

export default Socials;
