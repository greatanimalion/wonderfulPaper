interface Window {
    DOMURL: {
        createObjectURL: (obj: any) => string
        revokeObjectURL: (url: Blob) => void
    };

}