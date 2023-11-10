import { useRouter } from "next/router";
import Home from "~/routes/Home";
import SingleUserChirp from "~/routes/SingleUserChirp";
import Profile from "~/routes/Profile";

export default function Parent() {
  const router = useRouter();

  if (router.asPath === "/") return <Home />;

  if (router.query?.slug) {
    const userId = router.query.slug[0];
    const middlePath = router.query.slug[1];
    const postId = router.query.slug[2];

    if (userId && middlePath && postId) return <SingleUserChirp />;

    if (userId) return <Profile />;
  }

  return null;
}
