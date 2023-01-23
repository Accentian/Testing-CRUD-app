import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import getProject from "src/projects/queries/getProject"
import deleteProject from "src/projects/mutations/deleteProject"

/**
 * Import the styles for CSS
 */
import styles from "src/styles/Home.module.css"

export const Project = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [deleteProjectMutation] = useMutation(deleteProject)
  const [project] = useQuery(getProject, {
    id: projectId,
  })
  return (
    <>
      <Head>
        <title>Project {project.id}</title>
      </Head>

      {/* Modified the content by including CSS styles */}
      <div className={styles.body}>
        <div className={styles.code}>
          <code>
            <h1>Project {project.id}</h1>
            <div>
              <code>Project Information:</code>
              <pre>{JSON.stringify(project, null, 2)}</pre>
            </div>
          </code>
        </div>
      </div>
      <Link
        legacyBehavior
        href={Routes.EditProjectPage({
          projectId: project.id,
        })}
      >
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteProjectMutation({
              id: project.id,
            })
            await router.push(Routes.ProjectsPage())
          }
        }}
        style={{
          marginLeft: "0.5rem",
        }}
      >
        Delete
      </button>
    </>
  )
}
const ShowProjectPage = () => {
  return (
    <div>
      <p>
        <Link legacyBehavior href={Routes.ProjectsPage()}>
          <a>Projects</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Project />
      </Suspense>
    </div>
  )
}
ShowProjectPage.authenticate = true
ShowProjectPage.getLayout = (page) => <Layout>{page}</Layout>
export default ShowProjectPage
