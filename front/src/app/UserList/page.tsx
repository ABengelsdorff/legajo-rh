import Users from "@/components/utils/listaDeUsuarios";

export default function UserList() {
  return (
    <main>
      <Users />
    </main>
  );
}

// "use client"

// import dynamic from "next/dynamic";
// import withAuth from "@/components/utils/withAuth";

// // Carga el componente sin SSR (porque usa "use client")
// const UserList = dynamic(() => import("@/components/utils/listaDeUsuarios"), { ssr: false });

// export default withAuth(UserList, true); // true = solo admin
