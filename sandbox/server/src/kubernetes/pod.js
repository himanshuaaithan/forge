import { ResourceApi } from "@kubernetes/client-node";
import { k8scoreV1Api } from "./config.js";

export const createpod = async (sendboxId) => {
    const podManiFest = {
        metadata: {
            name: `sendbox-pod-${sendboxId}`,
            labels: {
                app: `sendbox`,
                sendboxId: sendboxId
            }
        },
        spec: {
            containers: [
                {
                    image: "template",
                    imagePullPolicy: "IfNotPresent",
                    name: `sandbox-container`,
                    ports: [
                        {
                            containerPort: 5173,
                            name: "http"
                        }
                    ],
                    Resources: {
                        limits: {
                            cpu: "500m",
                            memory: "1Gi"
                        },
                        requests: {
                            cpu: '250',
                            memory: "500Mi"
                        }
                    }
                }
            ]
        }
    }

    try {
        const response = await k8scoreV1Api.createNamespacedPod({
            namespace: "default",
            body: podManiFest
        });

        return response;

    } catch (error) {
        console.log("FULL ERROR:");
        console.dir(error, { depth: null });

        throw error;
    }
}