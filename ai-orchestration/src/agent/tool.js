import * as z from "zod"
import { tool } from "langchain"
import axios from "axios";

const fileApiUrl = "http://sandbox-service-aace6443-2263-4e9a-afbe-64d3afeb8c8c:3000"
const updateApiUrl = "http://sandbox-service-aace6443-2263-4e9a-afbe-64d3afeb8c8c:3000"

export const listFile = tool(
    async () => {
        try {
            const response = await axios.get(`${fileApiUrl}/list-files`)
            return JSON.stringify(response.data.files);
        } catch (error) {
            throw new Error(error.message);

        }
    },
    {
        name: "list_files",
        description: "list the files from folder",
        schema: z.object({}),
    }
);

export const readFile = tool(
    async ({ files }) => {
        const response = await axios.get(
            `${fileApiUrl}/read-file`,
            { params: { files } }
        )
        return JSON.stringify(response.data.result)
    },
    {
        name: "read_files",
        description: "Read the contents of specified files. This is useful for understanding the content of files that are relevant to the task at hand.",
        schema: z.object({
            files: z.array(z.string()).describe('Workspace-relative paths listed by list_files or created later')
        })
    }

)

export const updateFile = tool(
    async ({ files }) => {
        const response = await axios.patch(`${updateApiUrl}/update-file`, {
            files
        })
        return JSON.stringify(response.data.result);
    },
    {
        name: "update_files",
        description: "Update the contents of specified workspace files. Provide workspace-relative fileName values and the full replacement content. Use list_files to find paths first.",
        schema: z.object({
            files: z.array(z.object({
                fileName: z.string().describe("The workspace-relative path of the file to update"),
                content: z.string().describe("The full replacement content for the file")
            })).describe("The list of files to update and their new contents")
        })
    }
)