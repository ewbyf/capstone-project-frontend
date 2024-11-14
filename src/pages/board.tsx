import { KanbanBoard } from "@/components/KanbanBoard";
import api from "@/services/axiosConfig";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ListItem } from "@/interfaces/ListItem";

const Board = () => {
    const [id, setId] = useState('');
    const [items, setItems] = useState<ListItem[]>([])
    const router = useRouter();

    useEffect(() => {
        const arr = router.asPath.split('=')
        setId(arr[1]);
        api.get(`/projects/${arr[1]}/todos?token=${localStorage.getItem('token')}`)
        .then((resp) => {
            console.log(resp.data)
        })
        .catch((err) => {
            console.log(err)
        })

    }, [])

    return (
        <div>
            <KanbanBoard></KanbanBoard>
        </div>
    );
}
 
export default Board;