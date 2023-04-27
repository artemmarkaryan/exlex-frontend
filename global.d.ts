declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}
interface ImportMetaEnv {
    readonly VITE_SERVER_LOCATION: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
