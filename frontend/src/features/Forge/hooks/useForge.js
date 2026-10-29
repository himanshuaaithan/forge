import { previewUrl } from "../services/api.service";
import { setUrl } from "../state/sandboxSlice";
import { useDispatch } from "react-redux";


export const useForge = () => {

    const dispatch = useDispatch()

    // handle preview url function
    async function handlePreviewUrl() {
        const response = await previewUrl();
        dispatch(setUrl(response.data.previewUrl))
        return response.data.previewUrl
    }

    return {
        handlePreviewUrl
    }
}