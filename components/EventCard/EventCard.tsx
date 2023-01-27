import { Event } from "graphql";

export interface EventCardProps extends Event {
    className?: string;
    variant?: "featured" | "related" | "default";
}

const EventCard: React.FC<EventCardProps> = ({
    className,
    variant = "default",
    title,
    featuredImage,
    eventOptions,
}) => {
    return (
        <div className={className}>
            <h3>{title}</h3>
            <p>{eventOptions?.date}</p>
        </div>
    );
};


export default EventCard;
