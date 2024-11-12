import { Button } from "@/components/ui/button";
import api from "@/services/axiosConfig";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CreateProjectButton } from "@/components/CreateProjectButton";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [repos, setRepos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/')
        }
        api.get(`/projects?token=${token}`)
        .then((resp) => {
            console.log(resp.data)
            api.get(`/projects/available?token=${token}`)
            .then((resp2) => {
                console.log(resp2.data)
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => [
            console.log(err)
        ])
    }, [])

    return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-4">
            <p>Projects</p>
            <p>You have not created any projects yet</p>
            <CreateProjectButton></CreateProjectButton>
        </div>
    );
}
 
export default Projects;