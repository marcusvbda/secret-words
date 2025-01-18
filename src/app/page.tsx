import { StartGame } from "@/components/startGame.component";
import { getMaps } from "@/services/maps.service";

export default async function HomePage() {
  return <StartGame />;
}
