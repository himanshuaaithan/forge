import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'


const working_dir = "/workspace"

const app = express()
app.use(express.json())
app.use(morgan())
app.get('/api/agent/health', (req, res) => {
    res.status(200).json({ status: "ok" })
})

// ankur's code 
app.get("/list-files", async (req, res) => {
    try {
        const listFiles = async (dir, baseDir) => {
            const entries = await fs.promises.readdir(dir, { withFileTypes: true });
            const files = [];

            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                const relativePath = path.relative(baseDir, fullPath);

                if (entry.isDirectory() && ['node_modules', '.git', 'dist'].includes(entry.name)) {
                    continue;
                }

                if (entry.isDirectory()) {
                    files.push(...await listFiles(fullPath, baseDir));
                } else {
                    files.push(relativePath);
                }
            }

            return files;
        }

        const files = await listFiles(working_dir, working_dir);
        res.status(200).json({
            message: 'Files listed successfully',
            files,
        });
    } catch (err) {
        res.status(500).json({
            message: `Error listing files: ${err.message}`,
            status: 'error',
        });
    }

})

app.get('/read-file', async (req, res) => {
    const files = req.query.files;
    const filesName = Array.isArray(files) ? files : [files];

    try {
        const result = await Promise.all(
            filesName.map(async (file) => {
                const filePath = path.join(working_dir,  file)

                const content = await fs.promises.readFile(filePath, "utf8")

                return { file, content }
            })
        )

        res.status(200).json({
            message: 'file is ready to read',
            result
        })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.post('/create-file', async (req, res) => {
    const files = req.body.files;
    console.log(files)

    const result = await Promise.all(files.map(async (fileobj) => {
        const { fileName, content } = fileobj
        const filePath = path.join(working_dir, fileName)

        try {
            await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
             await fs.promises.writeFile(filePath, content, 'utf-8');

            return {
                [filePath]: 'file create'
            }

        } catch (err) {
            return {
                error: err.message
            }
        }
    }))

    res.status(200).json({
      result
    })


})

app.patch('/update-file',async(req,res)=>{
    const files = req.body.files

    const result = await Promise.all(files.map(async(fileobj)=>{
        const {fileName,content} = fileobj
        const filepath = path.join(working_dir,fileName)


        try {
         await fs.promises.writeFile(filepath,content,"utf-8")
        
         return 'file update'
         
        } catch (err) {
            return{
                error:err.message
            }
            
        }
    }))

    res.status(200).json({
        result
    })
})
export default app