import { Navigation } from "@/components/Navigation";
import { VideoPlayer } from "@/components/VideoPlayer";

export default function Home() {
  return (
    <>
      <Navigation links={["link1", "link2", "link3"]} />;
      <VideoPlayer
        videoName={"andreas-pixabay.mp4"}
        overrides={{ mainVideoContainer: { width: "80%" } }}
      />
    </>
  );
}
