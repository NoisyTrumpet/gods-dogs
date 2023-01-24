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
          const ctaType =
            announcement.ctaType === `secondary` ? `announcement` : `primary`;
          const txtColor =
            announcement.backgroundColor === `secondary` ? `white` : `dark`;

          return (
            <div
              key={`announcement-${announcement.ctaType}`}
              className={`bg-${announcement.backgroundColor}-light flex flex-col-reverse items-center justify-center p-2 md:flex-row`}
            >
              <p className={`text-${txtColor} mr-4`}>{announcement.content}</p>
              {announcement.cta ? (
                <Button
                  type={ctaType}
                  href={announcement.cta.url ?? ``}
                  className={`order-first w-fit md:order-last`}
                >
                  {announcement.cta.title}
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
