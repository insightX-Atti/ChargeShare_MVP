
import { createClient } from "@/utils/supabase/server";

export default async function AppPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <h1>ChargeShare Dashboard</h1>

      {user ? (
        <p>Welcome to ChargeShare!</p>
      ) : (
        <p>Please log in to continue.</p>
      )}
    </main>
  );
}
