import styles from "./page.module.css";
import RoleCheck from "@/components/front/main/RoleCheck";
import EditorArea from "@/components/front/main/EditorArea";


export default function Home() {
    return (
        <main className={styles.main}>
            <RoleCheck/>
        </main>
    );
}
