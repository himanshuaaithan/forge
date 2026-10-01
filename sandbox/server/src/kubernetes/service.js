import { k8scoreV1Api } from "./config.js";

export const createService = async (sandboxId) => {
    const serviceManiFest = {
        metadata: {
            name: `sandbox-service-${sandboxId}`,
            labels: {
                app: 'sandbox',
                sandboxId: sandboxId
            }
        },
        spec: {
            selector: {
                app: 'sandbox',
                sandboxId: sandboxId
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