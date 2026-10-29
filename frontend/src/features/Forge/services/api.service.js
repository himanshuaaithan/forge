import axios from "axios";

export async function previewUrl() {
    const response = await axios.post('http://localhost/api/sandbox/start')
    console.log(response)
    return response
}