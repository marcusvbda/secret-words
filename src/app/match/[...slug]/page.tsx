import Fragment from "./fragment";
import { notFound, redirect } from "next/navigation";
import { findMatch } from "@/services/game.service";

export default async function MatchPage({ params }: any) {
  const [referece, type = "player"] = params?.slug ?? [];
  if (["player", "leader"].includes(type) === false) return notFound();

  if (!referece) return redirect("/");
  const match = await findMatch(referece);

  if (!match) return notFound();

  return <Fragment {...match} type={type} />;
}
