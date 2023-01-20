import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const imgSource =
  "https://gods-dog.flywheelsites.com/wp-content/uploads/2023/01/Gods-Dogs.png";

const bgSource =
  "https://gods-dog.flywheelsites.com/wp-content/uploads/2023/01/layered-waves-haikei-1.png";

const bgTransparent =
  "https://gods-dog.flywheelsites.com/wp-content/uploads/2023/01/layered-waves-haikei-1.png";

const font = fetch(new URL("../GOODDOG_NEW.TTF", import.meta.url)).then((res) =>
  res.arrayBuffer()
);

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fontData = await font;

    // Title
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "God's Dogs";
    // Description
    const hasDescription = searchParams.has("description");
    const description = hasDescription
      ? searchParams.get("description")?.slice(0, 200)
      : "Rescue";

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            background: `url(${bgSource})`,
            backgroundSize: "1200px 627px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div tw="flex h-full items-center z-30">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-6xl font-heading font-bold tracking-tight text-[#E71019] text-left">
                <span>{title}</span>
                <span tw="text-2xl font-heading font-bold tracking-tight text-[#292929] text-left">
                  <span>{description}</span>
                </span>
              </h2>
              <div tw="mt-8 flex md:mt-0">
                <img
                  alt={`God's Dogs Logo`}
                  src={imgSource}
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 627,
        fonts: [
          {
            name: "gooddog",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
