import { Header } from "@/common/components/header";

import { getUser } from "@/user/services";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) return <span>No user</span>;

  return (
    <>
      <Header>
        <h1>Profile</h1>
      </Header>
      <div className="flex flex-col">
        <span>
          Email: <strong>{user?.email}</strong>
        </span>
        <span>
          Fullname: <strong>{user?.fullname}</strong>
        </span>
      </div>
    </>
  );
}
