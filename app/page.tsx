import Background from "./Background";
import Counter from "./Counter";
import StoreProvider from "./StoreProvider";
import Settings from "./Settings";
import Counters from "./Counters";
// import LocalStorage from "./LocalStorage";
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
    <main className="flex h-full w-full flex-col items-center justify-center">
      <StoreProvider>
        {/* <LocalStorage /> */}
        {/* <Background /> */}
        <Counters />
        {/* <Counter />
        <Counter /> */}
        {/* <Settings /> */}
      </StoreProvider>
    </main>
  );
}
