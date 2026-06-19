import { getArticles } from "@/app/actions/news"
import HomeClient from "./HomeClient"

export const revalidate = 60 // Revalidate every minute

export default async function Page() {
  const articles = await getArticles()
  return <HomeClient articles={articles} />
}
