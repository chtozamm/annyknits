import Background from "./Background";
import Counter from "./Counter";
import StoreProvider from "./StoreProvider";
import Settings from "./Settings";
import LocalStorage from "./LocalStorage";
// import { supabase } from "@/lib/supabase";
// import { cookies } from "next/headers";

export default function Home() {
  // const userId = cookies().get("user_id");
  // const data = await supabase
  //   .from("counters")
  //   .select()
  //   .eq("user_id", userId?.value);
  // console.log(data.data);
  return (
    <main className="mx-auto flex min-h-screen w-screen max-w-md flex-col items-center justify-center font-sans">
      <StoreProvider>
        <LocalStorage />
        <Background />
        {/* <Navigation /> */}
        <Settings />
        <Counter />
      </StoreProvider>
    </main>
  );
}
