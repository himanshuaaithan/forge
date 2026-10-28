import * as z from "zod"
import { tool } from "langchain"
import axios from "axios";

export const listFile = tool(
    // console.log('hello from listfile tool ✅'),
    async ({ }, config) => {
        const projectId = config?.context?.projectId ?? config?.configurable?.projectId;
        if (!projectId) {
            throw new Error(
                'projectId missing in tool runtime config'
            );
        }
        try {
            console.log('[read_files] Tool called');
            console.log('[read_files] Context:', config.context);
            console.log(`tool--->projectId:${projectId}`)
            const writer = config.context?.writer ?? (() => { });
            writer("Listing files in project directory...\n")
            const response = await axios.get(`http://sandbox-service-${projectId}:3000/list-files`)
            writer("Files listed successfully." + "Files: " + response.data.files.join(",") + "\n");
            return JSON.stringify(response.data.files);

        } catch (error) {
            throw new Error(error.message);
        }
    },
    {
        name: "list_files",
        description: "List all the files in the project directory. This is useful for understanding what files are available to work with.",
        schema: z.object({}),
    }
);

export const readFile = tool(
    async ({ files }, config) => {
        const projectId = config?.context?.projectId ?? config?.configurable?.projectId;
        if (!projectId) {
            throw new Error(
                'projectId missing in tool runtime config'
            );
        }
        try {

            const writer = config.context?.writer ?? (() => { });
            writer("Reading files..." + files.join(",") + "\n");
            const response = await axios.get(`http://sandbox-service-${projectId}:3000/read-file`,
                { params: { files } }
            )
            writer('file read done')
            return JSON.stringify(response.data.result)

        } catch (error) {
            throw new Error(error.message)
        }
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
    async ({ files }, config) => {
        const projectId = config?.context?.projectId ?? config?.configurable?.projectId;
        if (!projectId) {
            throw new Error(
                'projectId missing in tool runtime config'
            );
        }
        try {

            const writer = config.context?.writer ?? (() => { });
            writer("Updating files..." + files.map(f => f.file).join(",") + "\n");
            const response = await axios.patch(`http://sandbox-service-${projectId}:3000/update-file`, {
                files
            })
            writer("Files updated successfully.\n");
            return JSON.stringify(response.data.result);

        } catch (error) {
            throw new Error(error.message)
        }
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