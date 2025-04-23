export interface message{
    message: string
}

export interface ModelType{
    id: number,
    model: string,
    parameter_size: string,
    active: boolean
}

export interface RagType{
    id: number,
    title: string,
    rag: string,
    category_id: number
}