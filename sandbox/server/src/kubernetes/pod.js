import { ResourceApi } from "@kubernetes/client-node";
import { k8scoreV1Api } from "./config.js";

export const createpod = async (sandboxId) => {
    const podManiFest = {
        metadata: {
            name: `sandbox-pod-${sandboxId}`,
            labels: {
                sandboxId: sandboxId
            }
        },
        spec: {
            volumes: [
                {
                    name: 'workspace-volume',
                    emptyDir: {}
                }

            ],
            initContainers: [
                {
                    name: 'init-containers',
                    image: 'template',
                    imagePullPolicy: "Always",
                    command: ['sh', '-c', 'cp -r /workspace/. /seed/'],
                    volumeMounts: [
                        {
                            name: 'workspace-volume',
                            mountPath: '/seed'
                        }
                    ]
                }
            ],
            containers: [
                {
                    image: "template",
                    imagePullPolicy: "Always",
                    name: `sandbox-container`,
                    ports: [
                        {
                            containerPort: 5173,
                            name: "http"
                        }
                    ],
                    resources: {
                        limits: {
                            cpu: "500m",
                            memory: "1Gi"
                        },
                        requests: {
                            cpu: '250m',
                            memory: "500Mi"
                        }
                    },
                    volumeMounts: [
                        {
                            name: 'workspace-volume',
                            mountPath: '/workspace'
                        }
                    ]
                },
                {
                    image: 'agent',
                    imagePullPolicy: "Always",
                    name: `agent-container`,
                    ports: [
                        {
                            containerPort: 3000,
                            name: "http"
                        }
                    ],
                    resources: {
                        limits: {
                            cpu: '500m',
                            memory: "1Gi"
                        },
                        requests: {
                            cpu: "250m",
                            memory: '500Mi'
                        }
                    },
                    volumeMounts: [
                        {
                            name: 'workspace-volume',
                            mountPath: '/workspace'
                        }
                    ]
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