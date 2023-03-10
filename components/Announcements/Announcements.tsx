import { Button } from "components/Button";

const Announcements = ({ announcements }: any) => {
  return (
    <div>
      {announcements.map(
        (announcement: {
          content: string;
          cta: any;
          ctaType: string;
          backgroundColor: string;
        }) => {
          const { backgroundColor, ctaType, cta, content } = announcement;

          const type = ctaType === `secondary` ? `announcement` : `primary`;
          const txtColor =
            announcement.backgroundColor === `secondary` ? `white` : `dark`;

          return (
            <div
              key={`announcement-${ctaType}`}
              className={`bg-${backgroundColor}-light flex flex-col-reverse items-center justify-center p-2 md:flex-row`}
            >
              {content ? (
                <p className={`text-${txtColor} mr-4`}>{content}</p>
              ) : null}
              {cta ? (
                <Button
                  variant={type}
                  href={cta.url ?? ``}
                  className={`order-first w-fit md:order-last`}
                  target={cta.target ?? `_self`}
                >
                  {cta.title}
                </Button>
              ) : null}
            </div>
          );
        }
      )}
    </div>
  );
};

export default Announcements;
