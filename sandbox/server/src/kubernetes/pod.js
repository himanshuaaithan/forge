import { ResourceApi } from "@kubernetes/client-node";
import { k8scoreV1Api } from "./config.js";

export const createpod = async (sandboxId) => {
    const podManiFest = {
        metadata: {
            name: `sandbox-pod-${sandboxId}`,
            labels: {
                app: `sandbox`,
                sandboxId: sandboxId
            }
        },
        spec: {
            containers: [
                {
                    image: "template:latest",
                    imagePullPolicy: "Always",
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