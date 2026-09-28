import { k8scoreV1Api } from "./config.js";

export const createService = async (sendboxId) => {
    const serviceManiFest = {
        metadata: {
            name: `sendbox-service-${sendboxId}`,
            lables: {
                sendboxId: sendboxId
            }
        },
        spec: {
            selector: {
                sendboxId: sendboxId
            },
            ports: [
                {
                    name: "http",
                    port: 80,
                    targetPort: 5173,
                    protocol: "TCP"
                }
            ],
            type: "ClusterIP"
        }
    }

    const response = await k8scoreV1Api.createNamespacedService({
        namespace: "default",
        body: serviceManiFest
    })

    return response
}