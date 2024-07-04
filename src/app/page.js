import Image from "next/image";
import styles from "./page.module.css";
import {signOut} from "next-auth/react";
import RoleCheck from "@/components/front/main/RoleCheck";


export default function Home() {
  return (
    <main className={styles.main}>
      <RoleCheck/>
    </main>
  );
}
